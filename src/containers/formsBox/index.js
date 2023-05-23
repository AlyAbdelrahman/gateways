import React, {useEffect, useState} from 'react'
import CreateForm from '../createForm'
import ViewForm from "../viewForm";

export default function FormsBox() {
    
  const [gateways, setGateways] = useState();
  const [selectedGateway, setSelectedGatway] = useState(null);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [showForms, setShowForms] = useState(false);
  useEffect(()=>{
    const fetchGatways = async () => {
      const results = await fetch('http://localhost:5000/projectData');
      const data = await results.json();
      setGateways(data)
    }
    fetchGatways();
  },[])

  useEffect(()=>{
    // console.log('sec',selectedGateway)
    // setSelectedGatway()
  },[selectedGateway])
  const handleSelectGatway = (selectedGateway) => {
    if (selectedGateway === false)  {
      setSelectedGatway(null);
      return;
    }
    console.log('..sec',selectedGateway);
    setIsInEditMode(true);
    setSelectedGatway(selectedGateway);
  }
  return (
    <div className="row">
      <div className={showForms ? 'col-4' : 'col-12'}>
        <ViewForm gateways={gateways} setSelectedGatway={handleSelectGatway} setShowForms={setShowForms}/>
      </div>
      {showForms && <div className="col-8">
        <CreateForm setGateways={setGateways} gateways={gateways} selectedGateway={selectedGateway} isInEditMode={isInEditMode}/>
      </div>}
     </div>
  )
}
