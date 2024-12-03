import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard";
import AddProduct from "../../pages/AddProduct/AddProduct";

const RetailerPath = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/retailerDashboard" element={<RetailerDashboard />} />
					<Route path="/addProduct" element={<AddProduct />} />
				</Routes>
			</Router>
		</div>
	);
};

export default RetailerPath;
