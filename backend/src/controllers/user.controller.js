import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//create
const register = asyncHandler(async (req, res)=>{
    //get details
    const {username, email, password} = req.body
    try {
        if (!username|| !email || !password ) {
            return res.status(400).send({
                message: " All fields are required "
            })
        }
    
        //already exist
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })
        if(existedUser){
            return res.status(409).send({
                message : " User already exists "
            })
        }
        //creating object
        const hashpass = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password : hashpass,
        })
        //check created successfull or not
        const createdUser = await User.findById(user._id)
        if(!createdUser){
            return res.status(500).send({
                message: "Something went wrong"
            })
        }
        else{
            return res.status(201).send({
                message: "User registered Successfully"
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong"
        })
    }
})


//login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Received login request with email:", email); // Log email to check if it’s coming correctly from the frontend

    try {
        if (!email || !password) {
            console.log("Validation failed: Email or Password missing.");
            return res.status(400).send({
                message: "All fields are required",
            });
        }

        // Check if the user exists by email
        const existedUser = await User.findOne({ email });
        if (!existedUser) {
            console.log("User not found:", email); // Log if user does not exist
            return res.status(404).send({
                message: "User does not exist",
            });
        }
        console.log("User found:", existedUser); // Log the found user data

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, existedUser.password);
        if (!isPasswordValid) {
            console.log("Invalid password attempt for user:", email); // Log invalid password attempts
            return res.status(401).send({
                message: "Invalid user credentials",
            });
        }

        console.log("Password is valid, generating JWT...");

        const token = jwt.sign(
            { id: existedUser._id },
            process.env.TOKEN_SECRET, // This should come from the environment variable
            { expiresIn: "1h" }
        );
        

        // Set cookie with the token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookies only in production
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        console.log("Login successful for user:", email); // Log successful login

        return res.status(200).send({
            message: "Successfully logged in",
            authenticated: true,
        });
    } catch (error) {
        console.error("Error during login process:", error); // Log the error if it occurs
        return res.status(500).send({
            message: "Something went wrong",
            authenticated: false,
        });
    }
});

  

//get single data
const  dashboard= asyncHandler(async (req,res)=>{
    const token = req.cookies.token;

    try {
        if (!token) {
            return res.status(401).send({
                message: "No token found",
                authenticated: false,
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id).select('-password'); 

        if(!user){
            return res.status(404).send({
                message: "User not found",
                authenticated: false,
            });

        }
        
        if(req.method=== "PUT"){
            const {username, email, password, address, city, state, phone, pincode} = req.body
            if(address){
                user.address = address
            }
            if(username){
                user.username = username
            }
            if(email){
                user.email = email
            }
            if(city){
                user.city = city
            }
            if(state){
                user.state = state
            }
            if(phone){
                user.phone = phone
            }
            if(pincode){
                user.pincode = pincode
            }
            if(password){
                user.password = password
            }

            await user.save()
            const updatedUser = await User.findById(user._id)

            return res.status(200).json({
                message: "Profile updated successfully",
                authenticated: true,
                data: updatedUser,
            });
            

        }
        
        return res.status(200).send({
            message: "Success",
            authenticated: true,
            data: user,
        });


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                message: "Token expired",
                authenticated: false,
            });
        }

        return res.status(400).send({
            message: "Invalid token",
            authenticated: false,
        });
    }
})

//update data


//logout
const logout = asyncHandler(async (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'

        })
        return res.status(200).send({
            message: "Succesfully logged out"
        })

        
    } catch (error) {
        return res.status(500).send({
            message : " Something went wrong "
        })
        
    }


})

export {register,
        login,
        logout,
        dashboard,      
}