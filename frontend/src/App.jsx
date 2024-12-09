import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Path from "./routes/user/index.jsx";
import RetailerPath from "./routes/retailer/index.jsx";
import ChatbotPage from "./pages/ChatBot/ChatbotPage.jsx"; // Import chatbot page here
import "./App.css";

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
      {/* Independent Chatbot Route */}
      <ChatbotPage />
    </>
  );
}

export default App;
