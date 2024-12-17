import React from "react";

export function HomeCarousal() {
  return (
    <div
      className="relative h-72 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="md:text-5xl font-bold mb-4">Abay Gebeya</h1>
        <p className="text-xl mb-6">Discover new places and adventures.</p>
        <a
          href="#"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
