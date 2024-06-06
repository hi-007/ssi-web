
// src/components/Card2.jsx
import React from 'react';
import Rectangle from '../assets/img/Rectangle.png'; // Adjust the import path as needed

const Card2 = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-4 border rounded-lg cursor-pointer ${
        isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
      }`}
    >
      {isSelected && (
        <img
          src={Rectangle}
          alt="Rectangle"
          className="absolute top-0 right-0 mt-0 mr-2 w-6 h-6"
        />
      )}
      <div className="flex items-start space-x-4">
        {icon}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card2;
