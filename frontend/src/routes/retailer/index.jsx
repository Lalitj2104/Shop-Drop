import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RetailerDashboard from "../../pages/RetailerDashboard/RetailerDashboard";

const RetailerPath = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/retailerDashboard" element={<RetailerDashboard />} />
				</Routes>
			</Router>
		</div>
	);
};

export default RetailerPath;
