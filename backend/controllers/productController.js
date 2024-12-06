import mongoose from "mongoose";
import Product from "../models/product.js";
import Retailer from "../models/retailer.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import Review from "../models/review.js";
import cloudinary from "cloudinary";

export const addProduct = async (req, res) => {
	try {
		//getting the data from body
		const {
			image,
			name,
			description,
			category,
			price,
			available_quantity_delivery,
			available_quantity_inStore,
			tags,
			brand,
		} = req.body;

		//checking the fields
		if (!name || !description || !category || !price || !tags || !brand) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let result;
		if (image) {
			result = await cloudinary.v2.uploader.upload(image, {
				folder: "pictures",
				//width:150
				//crp:"scale",
				//height:150,
			});
		}
		console.log("working");

		const newProduct = await Product.create({
			image: {
				public_id: result?.public_id,
				url: result?.secure_url,
			},
			retailerId: req.retailer._id,
			name: name,
			description: description,
			category: category,
			price: price,
			available_quantity_delivery: available_quantity_delivery,
			available_quantity_inStore: available_quantity_inStore,
			brand: brand,
			tags: tags,
		});
		console.log("working");

		Response(res, 200, true, message.productAddedMessage, newProduct);
	} catch (error) {
		console.log(error.message);
		Response(res, 500, false, error.message);
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const { id } = req.retailer;
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		let retailer = await Retailer.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		const products = await Product.find({ retailerId: req.retailer._id });
		// if (products.retailerId.toString() !== req.user._id.toString()) {
		// 	return Response(res, 403, false, message.invalidRetailerMessage);
		// }
		Response(res, 201, true, message.productsFoundMessage, products);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id)
		if (!id) {
			return Response(res, 401, false, message.idNotFoundMessage);
		}
		
		const products = await Product.findById(id);
		if (!products) {
			return Response(res, 400, false, message.productNotFoundMessage);
		}
		
		Response(res, 200, true, message.productFoundMessage,products);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find().populate(
			"retailerId",
			"firstName companyName gstNumber"
		);

		Response(res, 201, true, message.productsFoundMessage, products);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const removeProduct = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 401, message.idNotFoundMessage);
		}
		let product = await Product.findById(id);
		if (!product) {
			return Response(res, 400, false, message.productNotFoundMessage);
		}
		if (product.image) {
			const publicId = product?.image?.public_id?.split('/')[1]; 
			await cloudinary.v2.uploader.destroy(publicId) 
		}
		await Review.deleteMany({ product_id: id });
		await Product.findByIdAndDelete(id);

		Response(res, 200,true, message.productRemovedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		// Find the product by ID
		let product = await Product.findById(id);
		if (!product) {
			return Response(res, 400, false, message.noProductMessage);
		}

		// Destructure the fields from the request body
		const {
			name,
			description,
			category,
			price,
			available_quantity_delivery,
			available_quantity_inStore,
			tags,
			brand,
		} = req.body;

		// Update the product fields
		product.name = name || product.name;
		product.description = description || product.description;
		product.category = category || product.category;
		product.price = price || product.price;
		product.available_quantity_delivery =
			available_quantity_delivery || product.available_quantity_delivery;
		product.available_quantity_inStore =
			available_quantity_inStore || product.available_quantity_inStore;
		product.tags = tags || product.tags;
		product.brand = brand || product.brand;

		// Save the updated product
		await product.save();

		Response(res, 200, true, message.productUpdatedMessage, product);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
