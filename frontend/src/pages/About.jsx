import React from "react";

function About() {
  return (
    <div className="min-h-screen pt-[110px] px-10 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-yellow-600">About PetPaws</h1>
        <p className="mt-6 text-lg leading-relaxed">
          Welcome to <span className="font-semibold">PetPaws</span>, your go-to platform for pet adoption. 
          Our mission is to connect loving homes with pets in need. Whether you're looking for a dog, cat, 
          or any other companion, we make the process easy and reliable.
        </p>

        <div className="mt-10 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Why Choose PetPaws?</h2>
          <ul className="list-disc list-inside text-lg">
            <li><span className="font-semibold">Find a pet:</span> Browse available dogs, cats, and other pets.</li>
            <li><span className="font-semibold">Easy Registration:</span> List a pet for adoption in just a few steps.</li>
            <li><span className="font-semibold">Trusted Community:</span> We ensure safe and responsible adoptions.</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Join Us Today!</h2>
          <p className="text-lg">Whether you're looking to adopt or help pets find a home, PetPaws is here for you.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
