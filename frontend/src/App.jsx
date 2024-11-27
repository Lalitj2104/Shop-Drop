import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Path from "./routes";

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
		</>
	);
}

export default App;
