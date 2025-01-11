import React from "react";

function LocationSearchPanel({ suggestions, onSelect, type }) {
  
  return (
    <div>
      {suggestions.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="gap-4 border-2 p-3 border-gray-100 active:border-black rounded-lg flex items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{item}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;