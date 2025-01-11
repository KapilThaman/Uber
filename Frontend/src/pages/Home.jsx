import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../componants/LocationSearchPanel";
import VehiclePanel from "../componants/VehiclePanel";
import ConfirmRide from "../componants/ConfirmRide";
import WaitingForDriver from "../componants/WaitingForDriver";
import LookingForDriver from "../componants/LookingForDriver";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";


function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const panelRef = useRef();
  const panelCloseRef = useRef();
  const waitingForDriverRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef();
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [fare, setfare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);
  

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);

  const submitHandler = (e) => {
    e.preventDefault();
    // ... submit logic
  };

  useEffect(() => {
    socket.emit('join', {userType : 'user', userId : user._id})

    if (pickup.length >= 3) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: pickup },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          
          setPickupSuggestions(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        })
        .catch((error) => {
          console.error(error);
          setPickupSuggestions([]);
        });
    } else {
      setPickupSuggestions([]);
    }
  }, [pickup]);

  useEffect(() => {
    if (destination.length >= 3) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          
          setDestinationSuggestions(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        })
        .catch((error) => {
          console.error(error);
          setDestinationSuggestions([]);
        });
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  const handleSelectSuggestion = (type, suggestion) => {
    if (type === "pickup") {
      setPickup(suggestion);
      setPanelOpen(false);
    } else if (type === "destination") {
      setDestination(suggestion);
      setPanelOpen(false);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(120%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(120%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(120%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(120%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function FindTrip(){
    setVehiclePanel(true);
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {
            pickup: pickup,
            destination: destination,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
            setfare(response.data);
  }

  async function CreateRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: pickup,
        destination: destination,
        vehicleType: vehicleType,
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then((response) => {
        // setVehiclePanel(false);
        // setConfirmRidePanel(true);
        
    })
    .catch((error) => {
        console.error(error);
    });
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use  */}
        <img
          className="h-full w-full object-cover"
          src="https://www.researchgate.net/publication/320839993/figure/fig3/AS:556713386676224@1509742222719/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt=""
        />
        {/* <LiveTracking /> */}
      </div>
      <div className=" flex flex-col justify-end top-0 h-screen absolute w-full ">
        <div className="h-[30%] pt-5 pl-5 pr-5 bg-white relative ">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip </h4>
          <form onSubmit={submitHandler} className="relative py-3">
            <div className="line w-1 h-16 absolute top-[20%] left-5 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup"); // Set activeField to 'pickup'
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full "
              type="text"
              placeholder="Add a pick-up location"
              onChange={(e) => {
                setPickup(e.target.value);
              }}
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination"); // Set activeField to 'destination'
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          </form>
          {destination && pickup && panelOpen && ( <button onClick={FindTrip} className="bg-black text-white py-3 px-6 rounded-full w-full mt-4 text-lg font-semibold">
            Find Trip
          </button>)}
        </div>
        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel
            type={activeField} // Pass the activeField as type
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : activeField === "destination"
                ? destinationSuggestions
                : []
            }
            onSelect={(suggestion) =>
              handleSelectSuggestion(activeField, suggestion)
            }
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fare = {fare}
          setvehicleType = {setvehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6"
      >
        <ConfirmRide
        CreateRide={CreateRide}
        pickup={pickup}
        destination ={destination}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          fare={fare[vehicleType]}
          
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6"
      >
        <LookingForDriver
        pickup = {pickup}
        destination={destination}
        setVehicleFound={setVehicleFound} 
        fare={fare[vehicleType]}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
}

export default Home;
