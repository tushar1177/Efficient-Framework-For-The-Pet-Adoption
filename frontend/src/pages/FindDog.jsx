import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import toast from 'react-hot-toast';

function FindDog() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pet/allpet", {
          withCredentials: true,
        });

        // Filter only dogs
        const filteredDogs = response.data.data.filter(pet => pet.category === "Dog");
        setDogs(filteredDogs);
      } catch (error) {
        toast.error("Error fetching dogs");
      }
    };

    fetchDogs();
  }, []);

  return (
    <div className="flex pt-[110px]">
      <div className="w-1/5 h-auto py-2"></div>
      <div className="w-4/5">
        {dogs.length > 0 ? (
          dogs.map((dog) => <PetCard key={dog._id} pet={dog} />)
        ) : (
          <h1 className="font-Mont text-[20px] pt-2">No dogs available</h1>
        )}
      </div>
    </div>
  );
}

export default FindDog;
