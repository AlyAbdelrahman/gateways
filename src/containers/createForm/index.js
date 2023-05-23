import React, { useState, useRef, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import CreateSubForm from '../createSubForm';
import { validateEmptyString } from '../../utils/utils';
import Alert from 'react-bootstrap/Alert';

export default function CreateForm({selectedGateway, setSelectedGatway, isInEditMode, setGateways, gateways, isInAddMode, setIsInAddMode}) {
  const [subFormsData, setSubFormsData] = useState([]);
  const [devicesForms, setDevicesForms] = useState([<CreateSubForm gateways={gateways} selectedGateway={selectedGateway} setGateways={setGateways} key={0} index={0} subFormsData={subFormsData} setSubFormsData={setSubFormsData}/>]);
  const [ip,setIp] = useState('');
  const [gatewayName, setGatewayName] = useState('');
  const [isIinvalidIp, setisIinvalidIp] = useState(false);
  const [isIinvalidGatewayName, setisIinvalidGatewayName] = useState(false);
  const [showMaxReachWarning, setShowMaxReachWarning] = useState(false);

  useEffect(()=>{
    if (!selectedGateway){
      setIp('');
      setGatewayName('');
      setDevicesForms([<CreateSubForm gateways={gateways} selectedGateway={selectedGateway} setGateways={setGateways} key={0} index={0} subFormsData={subFormsData} setSubFormsData={setSubFormsData}/>]);
    }
    if (selectedGateway && isInEditMode){ 
      setIp(selectedGateway.ip);
      setGatewayName(selectedGateway.gatewayName);
      setDevicesForms(selectedGateway.subFormsData);
      setisIinvalidIp(false);
      setisIinvalidGatewayName(false);
    }
  },[selectedGateway])
  const handleNameValidation = (currentValue) => {
    return validateEmptyString(currentValue, setisIinvalidGatewayName)
  }

  const handleIpValidation = (currentValue) => {
    return validateEmptyString(currentValue, setisIinvalidIp)
  }
  const handleFormValidation = () => {
    handleNameValidation(gatewayName);
    handleIpValidation(ip); //192.168.5.68

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFormValidation();
    console.log('>>>setSubFormsData',gateways)
    console.log('>>>isIinvalidIp',isIinvalidIp)
    console.log('>>>isIinvalidGatewayName',isIinvalidGatewayName)
    console.log('>>ip',ip)
    console.log('>>gatewayName',gatewayName)
    console.log('>>isInAddMode',isInAddMode)
    console.log('>>!',!isIinvalidIp && !isIinvalidGatewayName && ip.length > 0 && gatewayName.length > 0 & isInAddMode)
    if (!isIinvalidIp && !isIinvalidGatewayName && ip.length > 0 && gatewayName.length > 0 & isInAddMode) { // Add mode
      console.log('>>>neww')
      setSelectedGatway({id: gateways.length + 1 ,ip, gatewayName, subFormsData});
      setGateways((oldGateways) => [...oldGateways,{id: gateways.length + 1 ,ip, gatewayName, subFormsData}])
      setIsInAddMode(false);
      return;
    }
    console.log('>>!!', !isIinvalidIp && !isIinvalidGatewayName && ip.length && gatewayName.length & !isInAddMode)
    if (!isIinvalidIp && !isIinvalidGatewayName && ip.length > 0 && gatewayName.length > 0 & !isInAddMode) { // Edit mode
      console.log('form is true')
      let editedGateWays = gateways;
      const updatedSelectedGateway = editedGateWays.map((gateway) => {
        if (gateway.id === selectedGateway.id){
            let newGateway = gateway;
            newGateway= {id: selectedGateway.id, ip, gatewayName, subFormsData};
            return newGateway;
        }
        return gateway
    })
      console.log('>>>up',updatedSelectedGateway)
      setGateways(updatedSelectedGateway)
    }
    // console.log('>>subFormsData',{ip, gatewayName, subFormsData})
  }
  
  const handleAddDeviceForm = (e) => {
    e.preventDefault();
    if (devicesForms.length === 10){
      return setShowMaxReachWarning(true)
    }
    setDevicesForms([...devicesForms,<CreateSubForm gateways={gateways} isInEditMode={subFormsData} selectedGateway={selectedGateway} setGateways={setGateways} index={subFormsData.length} key={devicesForms.length} setSubFormsData={setSubFormsData} />]);
  }
  return (
    <>
    <Card>
      <Card.Header>
            <div className='d-flex justify-content-between align-items-center'>
                <div>project's Properties</div>
            </div>
        </Card.Header>
      <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group className='w-100'>
          <Form.Label>Name</Form.Label>
          <InputGroup  className="mb-3" >
            <Form.Control isInvalid={isIinvalidGatewayName} onBlur={(e) => handleNameValidation(e.target.value)}  value={gatewayName} onChange={(e) => setGatewayName(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
            Please provide a Name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className='w-100'>
          <Form.Label>IPv4 address</Form.Label>
          <InputGroup  className="mb-3" >
            <Form.Control isInvalid={isIinvalidIp} onBlur={(e) => handleIpValidation(e.target.value)} value={ip} onChange={(e) => setIp(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid IP.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {devicesForms &&  devicesForms.map((deviceForm, index) => (<CreateSubForm gateways={gateways} selectedGateway={selectedGateway} setGateways={setGateways} isInEditMode={isInEditMode} key={index} index={index} subFormsData={deviceForm} setSubFormsData={setSubFormsData}/>))}
        {/* {!isInEditMode && devicesForms} */}
        <div className='d-flex justify-content-between mt-3'>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleAddDeviceForm}>
            Add device
          </Button>
          
        </div>
      </Form>
      </Card.Body>
    </Card>
      {showMaxReachWarning && <Alert variant="danger" onClose={() => setShowMaxReachWarning(false)} dismissible>
      <Alert.Heading>Oh snap! No more that 10 peripheral devices are allowed for a
        gateway.</Alert.Heading>
      </Alert>
      }
      </>
  )
}
