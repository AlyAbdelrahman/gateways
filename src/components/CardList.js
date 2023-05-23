import React from 'react'

export default function CardList({devicesData, setSelectedGatway, setShowForms}) {
  return (
    <ul className="list-group">
        {devicesData && devicesData.length > 0  && devicesData.map((deviceData, index) => (
            <li key={deviceData.ip} onClick={()=>{setSelectedGatway(deviceData);setShowForms(true)}} className='list-unstyled' style={{cursor:'pointer'}}>
             <div className="list-group-item d-flex justify-content-between align-items-center">
             <p className="m-0">{deviceData.gatewayName}</p>
             </div>
             </li>
        ))}
    </ul>
  )
}
