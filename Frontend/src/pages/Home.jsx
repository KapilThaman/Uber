import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../componants/LocationSearchPanel';
import VehiclePanel from '../componants/VehiclePanel';
import ConfirmRide from '../componants/ConfirmRide';
import WaitingForDriver from '../componants/WaitingForDriver';
import LookingForDriver from '../componants/LookingForDriver';
function Home() {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ vehiclePanel, setVehiclePanel ] = useState(false);
  const [ vehicleFound, setVehicleFound ] = useState(false);
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const panelRef = useRef();
    const panelCloseRef = useRef();
    const waitingForDriverRef = useRef(null)
    const vehiclePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null)
    const confirmRidePanelRef = useRef();
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)

  const submitHandler = ()=>{
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '70%',
            padding: 24
            // opacity:1
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
       
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
            // opacity:0
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
        
    }
}, [ panelOpen ])

useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])

useGSAP(function () {
    if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ confirmRidePanel ])

useGSAP(function () {
    if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehicleFound ])

useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ waitingForDriver ])



  return (
    <div className='h-screen relative overflow-hidden'>
    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className='h-full w-full object-cover' src="https://www.researchgate.net/publication/320839993/figure/fig3/AS:556713386676224@1509742222719/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png" alt="" />
                {/* <LiveTracking /> */}
            </div>
            <div className=' flex flex-col justify-end top-0 h-screen absolute w-full '>
                <div className='h-[30%] pt-5 pl-5 pr-5 bg-white relative '>
                <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                <h4 className='text-2xl font-semibold'>Find a trip </h4>
                <form onSubmit={(e)=>{submitHandler(e)}} className='relative py-3'>
                    <div className="line w-1 h-16 absolute top-[20%] left-5 bg-gray-900 rounded-full" ></div>
                    <input 
                    value={pickup}
                    onClick={()=>{setPanelOpen(true)}}
                    className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full ' 
                    type="text" 
                    placeholder='Add a pick-up location' 
                    onChange={(e)=>{setPickup(e.target.value)}}
                    />
                    <input 
                    value={destination}
                    onClick={()=>{setPanelOpen(true)}}
                    className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' 
                    type="text" 
                    placeholder='Enter  your destination' 
                    onChange={(e)=>{setDestination(e.target.value)}}
                    />
                </form>
                </div>
                <div ref={panelRef} className='h-[0%] bg-white'>
                    <LocationSearchPanel 
                    vehiclePanel = {vehiclePanel}
                    setVehiclePanel={setVehiclePanel}
                    setPanelOpen = {setPanelOpen}
                    
                    />
                </div>
                        
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6'>
            <VehiclePanel 
            setVehiclePanel={setVehiclePanel} 
            setConfirmRidePanel={setConfirmRidePanel}
            
            />
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6'>
            <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6'>
            <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6'>
            <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
            </div>
    </div>
  )
}

export default Home