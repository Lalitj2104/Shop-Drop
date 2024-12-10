import Cart from "../models/cart.js";
import Order from "../models/orders.js";
import Product from "../models/product.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const addOrder = async (req, res) => {
	try {
		const { paymentStatus, paymentMethod, shippingAddress } = req.body;
		if (!paymentStatus || !paymentMethod || !shippingAddress) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		const cart = await Cart.findOne({ userId: req.user._id });

		const retailerGroups = {};
		for (const item of cart.products) {
			const product = await Product.findById(item.productId);
			//Product.find({ _id: { $in: productIds } })
			if (!product) {
				return Response(res, 400, message.noProductMessage);
			}
			if (product.available_quantity_delivery < item.quantity) {
				return Response(res, 400, message.insufficientQuantityMessage);
			}

			const retailerId = product.retailerId.toString();
			if (!retailerGroups[retailerId]) {
				retailerGroups[retailerId] = [];
			}
			retailerGroups[retailerId].push({
				...item,
				productDetails: product, // Include product details for later use
			});
		}

		const orders = [];

		for (const retailerId in retailerGroups) {
			const retailerProducts = retailerGroups[retailerId];
			let totalAmount = 0;

			// Calculate total for the current retailer's products
			for (const item of retailerProducts) {
				totalAmount += item.productDetails._doc.price * item._doc.quantity;
			}
			for (const update of retailerProducts) {
				// console.log(update);
				console.log(update._doc.quantity);
				await Product.findByIdAndUpdate(update._doc.productId, {
					$inc: { available_quantity_delivery: -update._doc.quantity },
				});
			}
			// console.log("working");
			// console.log(retailerProducts);
			const order = await Order.create({
				userId: req.user._id,
				retailerId,
				products: retailerProducts.map((item) => ({
					productId: item._doc.productId,
					quantity: item._doc.quantity,
					price: item.productDetails.price,
				})),
				totalAmount,
				status: "Pending",
				shippingAddress,
				paymentMethod,
				paymentStatus,
			});
			orders.push(order);
		}
		cart.products = [];
		await cart.save();
		Response(res, 200, true, message.orderCreatedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const cancelOrder = async (req, res) => {
	try {
		const { orderId } = req.params;

		// Find the order and populate product details
		const order = await Order.findById(orderId).populate("products.productId");
		if (!order) {
			return Response(res, 400, false, message.orderNotFoundMessage);
		}

		// Check if the order can be canceled
		const orderTimeLimit =
			new Date(order.createdAt).getTime() + 1 * 60 * 60 * 1000; // 1 hour limit
		if (order.status !== "Pending" || orderTimeLimit <= Date.now()) {
			return Response(res, 400, false, message.orderCannotBeCancelledMessage);
		}

		// Update the status of the order
		order.status = "Cancelled";

		// Update product quantities
		for (const item of order.products) {
			const product = item.productId; // Access the populated product details
			if (product) {
				product.available_quantity_delivery += item.quantity; // Update quantity
				await product.save();
			}
		}

		await order.save();

		return Response(res, 200, true, message.orderCancelledMessage, order);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};

export const getOrderByUser = async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.user._id });

		Response(res, 200, true, message.ordersFetchedMessage, orders);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getOrderByRetailer = async (req, res) => {
	try {
		const orders = await Order.find({ retailerId: req.retailer._id }).populate(
			"products.productId userId"
		);

		Response(res, 200, true, message.ordersFetchedMessage, orders);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();

		Response(res, 200, true, message.ordersFetchedMessage, orders);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getOrderById = async (req, res) => {
	try {
		const { orderId } = req.params;
		// console.log(orderId)
		// console.log("working")

		const order = await Order.findById(orderId).populate(
			"products.productId",
			"image description price"
		);

		if (!order) {
			return Response(res, 404, false, message.orderNotFoundMessage);
		}
		Response(res, 200, true, message.orderFetchedMessage, order);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status } = req.body;

		const validStatuses = [
			"Pending",
			"Processing",
			"Shipped",
			"Delivered",
			"Cancelled",
			"picked up",
		];
		if (!validStatuses.includes(status)) {
			return Response(res, 400, false, message.invalidStatusMessage);
		}

		const order = await Order.findById(orderId);
		if (!order) {
			return Response(res, 404, false, message.orderNotFoundMessage);
		}

		order.status = status;
		if (order.paymentStatus == "Pending") {
			order.paymentStatus = "Paid";
		}
		await order.save();

		Response(res, 200, true, message.orderStatusUpdatedMessage, order);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getOrdersByStatus = async (req, res) => {
	try {
		const { status } = req.params;
		const retailerId = req.retailer._id;
		const validStatuses = [
			"Pending",
			"Processing",
			"Shipped",
			"Delivered",
			"Cancelled",
			"picked up",
		];
		if (!validStatuses.includes(status)) {
			return Response(res, 401, false, message.invalidStatusMessage);
		}
		const orders = await Order.find({ status, retailerId });

		Response(res, 200, true, message.ordersFetchedMessage, orders);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
