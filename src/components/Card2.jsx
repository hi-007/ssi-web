// src/components/Card2.jsx
import React from 'react';

const Card2 = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer ${
        isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center space-x-4">
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
