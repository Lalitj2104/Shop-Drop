import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Path from "./routes/user/index.jsx";
import RetailerPath from "./routes/retailer/index.jsx";

function App() {
	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={300}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="dark"
			/>
			<Path />
			<RetailerPath/>
		</>
	);
}

export default App;
