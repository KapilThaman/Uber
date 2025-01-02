import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../componants/LocationSearchPanel';
function Home() {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])

    const panelRef = useRef();
    const panelCloseRef = useRef();

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
                    <LocationSearchPanel/>
                </div>
                        
            </div>
            <div className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6'>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
                <div className='flex border-2 mb-3 active:border-black  rounded-xl w-full items-center justify-between p-3'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" />
                    <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo 
                        <span>
                            <i className="ri-user-3-fill">
                            </i>
                                4
                        </span>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>  
                    </h4>
                    </div>
                    <h2 className='text-lg font-semibold'>₹193</h2>
                </div>
                <div className='flex border-2 mb-3 active:border-black rounded-xl w-full items-center justify-between p-3'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo Bike 
                        <span>
                            <i className="ri-user-3-fill">
                            </i>
                                1
                        </span>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motor cycle rides</p>  
                    </h4>
                    </div>
                    <h2 className='text-lg font-semibold'>₹65</h2>
                </div>
                <div className='flex border-2 mb-3 active:border-black rounded-xl w-full items-center justify-between p-3'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo Bike 
                        <span>
                            <i className="ri-user-3-fill">
                            </i>
                                1
                        </span>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motor cycle rides</p>  
                    </h4>
                    </div>
                    <h2 className='text-lg font-semibold'>₹65</h2>
                </div>
                
                
            </div>
    </div>
  )
}

export default Home