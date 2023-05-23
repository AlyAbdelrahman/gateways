import React, { useState, useRef, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import CreateSubForm from '../createSubForm';
import { validateEmptyString } from '../../utils/utils';


export default function CreateForm({selectedGateway, isInEditMode, setGateways, gateways}) {
  const [subFormsData, setSubFormsData] = useState([]);
  const [devicesForms, setDevicesForms] = useState([<CreateSubForm gateways={gateways} selectedGateway={selectedGateway} setGateways={setGateways} key={0} index={0} subFormsData={subFormsData} setSubFormsData={setSubFormsData}/>]);
  const [ip,setIp] = useState('');
  const [gatewayName, setGatewayName] = useState('');
  const [isIinvalidIp, setisIinvalidIp] = useState(false);
  const [isIinvalidGatewayName, setisIinvalidGatewayName] = useState(false);

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

    if (!isIinvalidIp && !isIinvalidGatewayName && ip && gatewayName) {
      console.log('form is true')
      setGateways((oldGateways) => [...oldGateways,{ip, gatewayName, subFormsData}])

    } else {
      console.log('form is erroe')
    }
    // console.log('>>subFormsData',{ip, gatewayName, subFormsData})
  }
  
  const handleAddDeviceForm = (e) => {
    e.preventDefault();
    setDevicesForms([...devicesForms,<CreateSubForm gateways={gateways} isInEditMode={subFormsData} selectedGateway={selectedGateway} setGateways={setGateways} index={subFormsData.length} key={devicesForms.length} setSubFormsData={setSubFormsData} />]);
  }
  return (
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
  )
}
