import React, { useEffect, useState } from 'react'
import CreateForm from '../createForm'
import ViewForm from "../viewForm";
import { fetchGatways } from '../../services';

export default function FormsBox() {

  const [gateways, setGateways] = useState();
  const [selectedGateway, setSelectedGatway] = useState(null);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isInAddMode, setIsInAddMode] = useState(false);
  const [showForms, setShowForms] = useState(false);
  useEffect(() => {
    fetchGatways().then((data)=>setGateways(data));
  }, [])

  const handleSelectGatway = (selectedGateway) => {
    if (selectedGateway === false) {
      setSelectedGatway(null);
      setIsInAddMode(false);
      return;
    }
    setIsInEditMode(true);
    setSelectedGatway(selectedGateway);
    setIsInAddMode(false);
   
  }
  return (
    <div className="row">
      <div className={showForms ? 'col-4' : 'col-12'}>
        <ViewForm
          gateways={gateways}
          setSelectedGatway={handleSelectGatway}
          setShowForms={setShowForms}
          setIsInAddMode={setIsInAddMode} />
      </div>
      {showForms && <div className="col-8">
        <CreateForm
          isInAddMode={isInAddMode}
          setIsInAddMode={setIsInAddMode}
          setGateways={setGateways}
          setSelectedGatway={setSelectedGatway}
          gateways={gateways}
          selectedGateway={selectedGateway}
          isInEditMode={isInEditMode}
        />
      </div>}
    </div>
  )
}
