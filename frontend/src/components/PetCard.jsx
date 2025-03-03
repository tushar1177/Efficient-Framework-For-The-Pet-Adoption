import React, { useState } from "react";

function PetCard({ pet }) {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="py-7">
      <div className="w-3/4 h-auto bg-slate-200 flex rounded-md">
        <div className="w-1/5 bg-slate-400">
          {/* Pet Image */}
          {pet.image && (
            <img
              src={`http://localhost:8080${pet.image}`} // Use correct backend path
              alt={pet.name}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <img src={pet.image} alt={pet.name} className="w-full h-auto" />
        </div>
        <div className="w-4/5 p-10 font-Mont">
          <h1 className="text-[25px]">{pet.name}</h1>
          <p className="text-[15px] pt-5">{pet.description}</p>
          <div className="flex gap-[500px]">
            <p className="text-[30px] pt-5">${pet.price}</p>
            <p className="text-[15px] pt-10">Seller: {pet.owner?.username}</p>
          </div>

          {/* Contact Seller Button */}
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {showPhone ? `📞 ${pet.phone}` : "Contact Seller"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
