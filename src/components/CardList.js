import React from 'react'
import { v4 as uuid4 } from 'uuid';
export default function CardList({devicesData, setSelectedGatway, setShowForms}) {
  return (
    <ul className="list-group">
        {devicesData && devicesData.length > 0  && devicesData.map((deviceData, index) => (
              deviceData.ip && (<li key={uuid4()} onClick={()=>{setSelectedGatway(deviceData);setShowForms(true)}} className='list-unstyled' style={{cursor:'pointer'}}>
             <div className="list-group-item d-flex justify-content-between align-items-center">
             <p className="m-0">{deviceData.gatewayName}</p>
             </div>
             </li>)
        ))}
    </ul>
  )
}
