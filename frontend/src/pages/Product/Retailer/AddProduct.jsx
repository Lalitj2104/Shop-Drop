import { useState } from "react";
import "../../../styles/AddProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Actions/productAction";

function AddProduct() {
	const dispatch = useDispatch();

	const [details, setDetails] = useState({
		image: null,
		name: "",
		description: "",
		category: "",
		price: "",
		available_quantity_delivery: "",
		available_quantity_inStore: "",
		tags: "",
		brand: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setDetails((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setDetails({
					...details,
					image: reader.result, // Set the base64 image result
				});
			}
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Product data submitted: ", details);
		dispatch(addProduct(details));
	};

	return (
		<div className="add-product-page">
			<h2>Add New Product</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="form-group">
					<label htmlFor="productImage">Product Image</label>
					<input
						type="file"
						id="productImage"
						name="image"
						accept="image/*"
						onChange={handleImageChange}
						required
					/>
					{details.image && (
						<img
							src={details.image}
							alt="Product Preview"
							className="product-image-preview"
						/>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="productName">Product Name</label>
					<input
						type="text"
						id="productName"
						name="name"
						value={details.name}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productDescription">Description</label>
					<textarea
						id="productDescription"
						name="description"
						value={details.description}
						onChange={handleInputChange}
						required
					></textarea>
				</div>

				<div className="form-group">
					<label htmlFor="productCategory">Category</label>
					<input
						type="text"
						id="productCategory"
						name="category"
						value={details.category}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productPrice">Price</label>
					<input
						type="number"
						id="productPrice"
						name="price"
						value={details.price}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="availableQuantityDelivery">
						Available Quantity (Delivery)
					</label>
					<input
						type="number"
						id="availableQuantityDelivery"
						name="available_quantity_delivery"
						value={details.available_quantity_delivery}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="availableQuantityInStore">
						Available Quantity (In Store)
					</label>
					<input
						type="number"
						id="availableQuantityInStore"
						name="available_quantity_inStore"
						value={details.available_quantity_inStore}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productTags">Tags</label>
					<input
						type="text"
						id="productTags"
						name="tags"
						value={details.tags}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productBrand">Brand</label>
					<input
						type="text"
						id="productBrand"
						name="brand"
						value={details.brand}
						onChange={handleInputChange}
						required
					/>
				</div>

				<button type="submit" className="submit-button">
					Add Product
				</button>
			</form>
		</div>
	);
}

export default AddProduct;
