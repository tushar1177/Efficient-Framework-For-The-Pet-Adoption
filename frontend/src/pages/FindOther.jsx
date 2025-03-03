import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import toast from 'react-hot-toast';

function FindOther() {
  const [otherPets, setOtherPets] = useState([]);

  useEffect(() => {
    const fetchOtherPets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pet/allpet", {
          withCredentials: true,
        });

        // Filter only "Other" category pets
        const filteredOthers = response.data.data.filter(pet => pet.category === "Other");
        setOtherPets(filteredOthers);
      } catch (error) {
        toast.error("Error fetching other animals");
      }
    };

    fetchOtherPets();
  }, []);

  return (
    <div className="flex pt-[110px]">
      <div className="w-1/5 h-auto py-2"></div>
      <div className="w-4/5">
        {otherPets.length > 0 ? (
          otherPets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <h1 className="font-Mont text-[20px] pt-2">No other animals available</h1>
        )}
      </div>
    </div>
  );
}

export default FindOther;
