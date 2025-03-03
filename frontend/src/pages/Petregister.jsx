import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Petregister() {
  const [pet, setPet] = useState({
    name: "",
    category: "",
    sex: "",
    age: "",
    description: "",
    price: "",
    phone: "",
  });

  const [image, setImage] = useState(null); // State to store the selected image

  // Handle text input changes
  const handleChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  // Handle form submission
  const handlePet = async () => {
    try {
      const formData = new FormData();
      Object.keys(pet).forEach((key) => formData.append(key, pet[key]));
      if (image) formData.append("image", image); // ✅ Sending image file
  
      const response = await axios.post("http://localhost:8080/pet/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Important for file upload
      });
  
      if (response.status === 201) {
        toast.success("Pet registered successfully!");
        setPet({ name: "", category: "", sex: "", age: "", description: "", price: "", phone: "" });
        setImage(null);
      }
    } catch (error) {
      toast.error("Failed to register the pet. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <div className="h-auto pt-[110px] pl-[400px]">
      <h1 className="py-[30px] text-[50px] font-Mont pl-[105px]">ENTER YOUR PET</h1>

      {/* Name Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Enter Name:</h1>
        <input type="text" name="name" value={pet.name} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2" />
      </div>

      {/* Category Dropdown */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Select Category:</h1>
        <select name="category" value={pet.category} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2">
          <option value="">Select a category</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Sex Dropdown */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Select Sex:</h1>
        <select name="sex" value={pet.sex} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2">
          <option value="">Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Age Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Enter Age:</h1>
        <input type="number" name="age" value={pet.age} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2" />
      </div>

      {/* Description Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Enter Description:</h1>
        <textarea name="description" value={pet.description} onChange={handleChange} className="mb-3 h-[80px] pl-2 rounded-md bg-gray-300 w-[400px] border-2" />
      </div>

      {/* Price Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Enter Price:</h1>
        <input type="number" name="price" value={pet.price} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2" />
      </div>

      {/* Phone Number Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Enter Phone:</h1>
        <input type="text" name="phone" value={pet.phone} onChange={handleChange} className="mb-3 h-[40px] pl-2 rounded-md bg-gray-300 w-[400px] border-2" />
      </div>

      {/* Image Upload Input */}
      <div className="flex py-[15px] text-[22px] font-Mont">
        <h1 className="w-[250px]">Upload Image:</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3 h-[40px] w-[400px]" />
      </div>

      {/* Submit Button */}
      <div>
        <button className="text-[20px] bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handlePet}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Petregister;
