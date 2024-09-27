import express, { Request, Response } from "express"

import UserRoute from "./routes/userRoute"

import bodyParser from "body-parser";

import sequelize from "./config/dbconnect";

import cors from "cors"

const app = express();

import dotenv from "dotenv"

dotenv.config();
app.use(cors({
    origin:"*",
}));
app.use(bodyParser.json())

app.use("/user", UserRoute)

sequelize.sync({alter:true})
.then(()=>{
    console.log("Database Syncronized successfully")
}).catch((error)=>{
    console.log("Db connection unsuccessfull with error :::::;", error);
})



const port: string = process.env.port || "4000";
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: `User server  running on port : ${port}`
    })
})
app.listen(port,()=>{
    console.log("Your first code running on port : ", port);
})