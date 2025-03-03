import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
dotenv.config();  // This loads environment variables from the .env file

const app = express()
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Pet Adoption System!');
});

//route
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import petRoutes from "./routes/petroute.js";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images from "uploads" folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", petRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//route declaration
app.use("/user", userRouter)
app.use("/pet", productRouter)



export {app}