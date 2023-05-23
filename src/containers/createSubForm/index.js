import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { validateEmptyString } from '../../utils/utils';
import Button from 'react-bootstrap/Button';


const  CreateSubForm = ({setSubFormsData, subFormsData, isInEditMode, setGateways, selectedGateway, index, gateways}) => {
    const [vendorName, setVendorName] = useState('');
    const [status, setStatus] = useState(0);
    const [uId, setUid] = useState('');
    const [isVendorNameInVaild, setIsVendorNameInValid] = useState(false);
    const [isUidInVaild, setIsUidInVaild] = useState(false);

    useEffect(()=>{
        if(subFormsData && isInEditMode){
            setVendorName(subFormsData.vendorName);
            setUid(subFormsData.uId);
            setStatus(subFormsData.status);
            setIsUidInVaild(false);
            setIsVendorNameInValid(false);
        }
    },[subFormsData, isInEditMode])

    const handleVendorNameValidation = (currentValue) => {
        return validateEmptyString(currentValue, setIsVendorNameInValid)
      }
    const handleUidValidation = (currentValue) => {
        return validateEmptyString(currentValue, setIsUidInVaild)
    }

    const handleDeviceFormValidation = () => {
        handleVendorNameValidation(vendorName || '');
        handleUidValidation(uId || '');
        if ((vendorName && uId && isInEditMode)){
            const updatedSelectedGateway = gateways.map((gateway) => {
                if (gateway.id === selectedGateway.id){
                    const newGateway = gateway;
                    newGateway.subFormsData[index] = {index, vendorName, uId, status};
                    return newGateway;
                }
                return gateway
            })
            console.log('>>>up',updatedSelectedGateway)
        }
        else if (vendorName && uId){
            setSubFormsData((formsData) => [...formsData,{index: formsData.length + 1, vendorName, uId, status}])
        }
    }    
  return (
    <Card className='mb-2'>
      <Card.Header>
            <div className='d-flex justify-content-between align-items-center'>
                <div>peripheral device's Properties</div>
            </div>
        </Card.Header>
            <Card.Body>
            <Form.Group className='w-100' >
                <Form.Label>Vendor Name</Form.Label>
                <InputGroup  className="mb-3" >
                    <Form.Control onBlur={(e)=>handleVendorNameValidation(e.target.value)} isInvalid={isVendorNameInVaild} value={vendorName || ''} onChange={(e) => setVendorName(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                    Please provide Vendor Name.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className='w-100'>
                <Form.Label>UID</Form.Label>
                <InputGroup  className="mb-3" >
                    <Form.Control isInvalid={isUidInVaild} onBlur={(e)=>handleUidValidation(e.target.value)}  value={uId || ''} onChange={(e) => setUid(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide UID.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                    <Form.Select onChange={(e) => setStatus(e.target.value)} aria-label="Default select example" value={status}>
                    <option>Select status</option>
                    <option value="0">Offline</option>
                    <option value="1">Online</option>
                </Form.Select>
            </Form.Group>

            <Button variant="info" onClick={handleDeviceFormValidation}>
            Save device info
          </Button>
            </Card.Body>
    </Card>
  )}
export default CreateSubForm;