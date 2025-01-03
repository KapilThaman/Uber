import React from "react";

function LocationSearchPanel(props) {
   
  //sample array of locations
  const locations = [
    "Near 13438 central ave, Surrey Central",
    "Near 13439 central ave, Surrey Central",
    "Near 13440 central ave, Surrey Central",
    "Near 13441 central ave, Surrey Central",
  ];
  return (
    // This is just a sample data
    <div>
      {locations.map((item,index) => {
        return (
          <div key={index} onClick={()=>{props.setVehiclePanel(true);
            props.setPanelOpen(false)
          }} className=" gap-4 border-2 p-3 border-gray-100 active:border-black rounded-lg   flex items-center my-2 justify-start">
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">
              {item}
            </h4>
          </div>
        );
      })}
    </div>
  );
}

export default LocationSearchPanel;
