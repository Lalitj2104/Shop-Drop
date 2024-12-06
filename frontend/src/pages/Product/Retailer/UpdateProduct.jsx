import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/UpdateProduct.css";
import { updateProduct } from "../../../redux/Actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../../constants/toast";

const UpdateProduct = () => {
	const dispatch = useDispatch();
	const {loading,message,error}=useSelector(state=>state.productAuth);
	const {id}=useParams();
	const navigate=useNavigate();

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
		dispatch(updateProduct(id,productData));
		
	};
	useEffect(()=>{
		if(message){
			toast.success(message,toastOptions);
			dispatch({type:"CLEAR_MESSAGE"})
			navigate("/retailerDashboard")
		}
		if(error){
			toast.error(error,toastOptions);
			dispatch({type:"CLEAR_ERROR"})
		}
	},[message,error]);
	return (
		<div className="update-product-page">
			<h2>Update Product</h2>
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
					/>
				</div>

				<div className="form-group">
					<label htmlFor="productDescription">Description</label>
					<textarea
						id="productDescription"
						name="description"
						value={productData.description}
						onChange={handleInputChange}
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
					/>
				</div>

				<button type="submit" className="submit-button" disabled={loading}>
				{loading ? <span className="spinner"></span> : "Update Product"}
				</button>
			</form>
		</div>
	);
};

export default UpdateProduct;
