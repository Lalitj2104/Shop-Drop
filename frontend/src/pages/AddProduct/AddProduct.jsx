import { useState } from "react";
import "../../styles/AddProduct.css";

function AddProduct() {
	const [productData, setProductData] = useState({
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
		setProductData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setProductData((prevData) => ({
			...prevData,
			image: file,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Product data submitted: ", productData);
		// Here you would send the data to the backend, e.g., via an API call
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
					/>
					{productData.image && (
						<img
							src={URL.createObjectURL(productData.image)}
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
						value={productData.name}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productDescription">Description</label>
					<textarea
						id="productDescription"
						name="description"
						value={productData.description}
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
						value={productData.category}
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
						value={productData.price}
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
						value={productData.available_quantity_delivery}
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
						value={productData.available_quantity_inStore}
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
						value={productData.tags}
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
						value={productData.brand}
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
