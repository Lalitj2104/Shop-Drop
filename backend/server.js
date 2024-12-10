import app from "./app.js"
import connectDB from "./config/db.js"
import cloudinary from "cloudinary"
import io from "socket.io-client"
import initializeGame  from "./utils/game-logic.js"

connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})


const httpServer=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

const Socketio=io(httpServer,{
    cors:{
		origin: [process.env.LOCAL_URL, process.env.WEB_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}
})

Socketio.on("connection",client=>{
    initializeGame(Socketio,client);
})

