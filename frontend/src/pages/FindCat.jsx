import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import toast from 'react-hot-toast';

function FindCat() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pet/allpet", {
          withCredentials: true,
        });

        // Filter only cats
        const filteredCats = response.data.data.filter(pet => pet.category === "Cat");
        setCats(filteredCats);
      } catch (error) {
        toast.error("Error fetching cats");
      }
    };

    fetchCats();
  }, []);

  return (
    <div className="flex pt-[110px]">
      <div className="w-1/5 h-auto py-2"></div>
      <div className="w-4/5">
        {cats.length > 0 ? (
          cats.map((cat) => <PetCard key={cat._id} pet={cat} />)
        ) : (
          <h1 className="font-Mont text-[20px] pt-2">No cats available</h1>
        )}
      </div>
    </div>
  );
}

export default FindCat;
