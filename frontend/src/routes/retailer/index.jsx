import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard";
import AddProduct from "../../pages/Product/AddProduct";
import UpdateProduct from "../../pages/Product/UpdateProduct";

const RetailerPath = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/retailerDashboard" element={<RetailerDashboard />} />
					<Route path="/addProduct" element={<AddProduct />} />
					<Route path="/updateProduct" element={<UpdateProduct />} />
				</Routes>
			</Router>
		</div>
	);
};

export default RetailerPath;
