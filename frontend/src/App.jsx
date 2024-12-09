import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Path from "./routes/user/index.jsx";
import RetailerPath from "./routes/retailer/index.jsx";
import "./App.css";
import AdminPath from "./routes/Admin/index.jsx";

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
      {/* Main application routes */}
      <Path />
      <RetailerPath />
      <AdminPath/>
    </>
  );
}

export default App;
