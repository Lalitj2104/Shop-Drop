// src/components/ProductList.jsx
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import staticProducts from "../../../data/staticProducts";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProducts } from "../../../redux/Actions/productAction";
import Loading from "../../../components/Loading/LoadingPage"



// const useStaticData = true; // Set to `false` to fetch data from backend

const ProductList = () => {
	
	const dispatch=useDispatch();
	const {loading,products}=useSelector(state=>state.productAuth);
	useEffect(()=>{
		dispatch(getProducts())
	},[dispatch])

	return (
    <>
      <Header/>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					padding: "20px",
				}}
			>
				{loading ? (
					<Loading/>
				) : (
					products&&products.map((product) => (
						<ProductCard  product={product} />
					))
				)}
      </div>
      <Footer/>
		</>
	);
};

export default ProductList;
