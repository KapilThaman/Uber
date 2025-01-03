import React from 'react'

function VehiclePanel(props) {
  return (
    <div>
        <h5 onClick={()=>{props.setVehiclePanel(false)}} className='p-3 text-center absolute top-0 right-0'><i className="ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
                <div onClick={()=>{props.setConfirmRidePanel(true)}} className='flex border-2 mb-3 active:border-black  rounded-xl w-full items-center justify-between p-3'>
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
                    <h2 className='text-lg font-semibold'>$193</h2>
                </div>
                <div onClick={()=>{props.setConfirmRidePanel(true)}} className='flex border-2 mb-3 active:border-black rounded-xl w-full items-center justify-between p-3'>
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
                    <h2 className='text-lg font-semibold'>$65</h2>
                </div>
                
    </div>
  )
}

export default VehiclePanel