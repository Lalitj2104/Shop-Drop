import express from "express"
import dotenv from "dotenv"

dotenv.config({path:"./config/config.env"});

const app=express();

app.get('/',(req,res)=>{
    res.send("yoour server is active");
})

app.use(express.json);
express.use(express.urlencoded({extended:false}));


export default app;