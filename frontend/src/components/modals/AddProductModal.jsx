import React, { useState } from "react";
import "../../styles/Modal.css";
import { X } from "lucide-react";

const AddProductModal = ({ onClose }) => {
	const [productDetails, setProductDetails] = useState({
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductDetails({
			...productDetails,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setProductDetails({
					...productDetails,
					image: reader.result,
				});
			}
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	return (
		<section className="modal-container">
			<div className="modal-cont">
				<div className="modal">
					{!productDetails.image ? (
						<div className="inptBx">
							<div
								className="close"
								onClick={() => onClose(false)}
								style={{ top: "12px", right: "12px" }}
							>
								<X className="close" />
							</div>
							<div className="upload-container">
								<h2>Upload Product Image</h2>
								<p className="instructions">
									Choose an image for your product. Preview will be shown below.
								</p>
							</div>
							<input
								type="file"
								id="fileInput"
								name="image"
								accept="image/*"
								onChange={handleFileChange}
								style={{ display: "none" }}
							/>
							<label htmlFor="fileInput" className="customFileInput">
								Upload File
							</label>
						</div>
					) : (
						<>
							<div className="imgBx">
								<img src={productDetails.image} alt="Product" />
							</div>
							<div className="content">
								<div className="close" onClick={() => onClose(false)}>
									<X className="close" />
								</div>
								<div className="create">
									<div className="field">
										<input
											type="text"
											name="name"
											placeholder="Product Name"
											value={productDetails.name}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<textarea
											name="description"
											placeholder="Product Description"
											value={productDetails.description}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="text"
											name="category"
											placeholder="Category"
											value={productDetails.category}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="number"
											name="price"
											placeholder="Price"
											value={productDetails.price}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="number"
											name="available_quantity_delivery"
											placeholder="Available for Delivery"
											value={productDetails.available_quantity_delivery}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="number"
											name="available_quantity_inStore"
											placeholder="Available In-Store"
											value={productDetails.available_quantity_inStore}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="text"
											name="tags"
											placeholder="Tags (comma separated)"
											value={productDetails.tags}
											onChange={handleChange}
										/>
									</div>
									<div className="field">
										<input
											type="text"
											name="brand"
											placeholder="Brand"
											value={productDetails.brand}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="post-btn">
									<button>Add Product</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default AddProductModal;
