import express from "express";
import upload from "../middleware/upload.js"; // Ensure correct path to upload.js
import Pet from "../models/pet.model.js"; // Ensure correct path to Pet model

const router = express.Router();

// Register Pet with Image Upload
// router.post("/register-pet", upload.single("image"), async (req, res) => {
//   try {
//     const { name, category, description, price, owner } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

//     const newPet = new Pet({
//       name,
//       category,
//       description,
//       price,
//       owner,
//       image: imagePath, // Store the relative path
//     });

//     await newPet.save();
//     res.status(201).json({ message: "Pet registered successfully", pet: newPet });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering pet", error });
//   }
// });

// export default router;

router.post("/create", upload.single("image"), async (req, res) => {
    try {
      console.log("Received File:", req.file); // ✅ Debugging output
      console.log("Request Body:", req.body);
  
      const { name, category, sex, age, description, price, phone } = req.body;
  
      // ✅ Ensure image path is stored
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      console.log("Image Path to be Saved:", imagePath); // ✅ Debugging output
  
      const newPet = new Pet({
        name,
        category,
        sex,
        age,
        description,
        price,
        phone,
        image: imagePath, // ✅ Storing image path in MongoDB
      });
  
      await newPet.save();
      res.status(201).json({ message: "Pet registered successfully!", pet: newPet });
    } catch (error) {
      console.error("Error in Pet Creation:", error);
      res.status(500).json({ message: "Error registering pet", error });
    }
  });
  export default router;