const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/database");
require("dotenv").config();



const app = express()


app.use(cookieParser());
app.use(express.json());


connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoutes");
app.use("/api/v1/user", userRoute)
app.use("/api/v1/project", projectRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log(`server started on port ${process.env.PORT || 5000}`);
    
})