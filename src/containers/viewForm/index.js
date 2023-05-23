import React from 'react'
import Card from 'react-bootstrap/Card';
import CardList from '../../components/CardList';
import Button from 'react-bootstrap/Button';

export default function ViewForm({gateways, setSelectedGatway, setShowForms}) {

  return (
    <Card>
        <Card.Header>
            <div className='d-flex justify-content-between align-items-center'>
                <div>Gateways</div>
                <Button variant="primary" onClick={() => {setShowForms(true);setSelectedGatway(false)}}>Add</Button>
            </div>
        </Card.Header>
        <CardList devicesData={gateways} setSelectedGatway={setSelectedGatway} setShowForms={setShowForms}/>
        
    </Card>
  )
}
