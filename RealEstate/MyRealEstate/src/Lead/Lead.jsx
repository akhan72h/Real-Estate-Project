import React, { useState } from 'react'
import LeadGrid from './LeadGrid'
import { Button, Drawer } from '@mui/material'
import LeadForm from './LeadForm';

export default function Lead() {

  const [open, setOpen] = useState(false);

  const [id, setIds] = useState([]);

  const toggleDrawer = (newOpen) => () => {

    setOpen(newOpen);
    
  }
  const Opendr = () =>{

    setOpen(true);

  }
  return (
    <div>
        <Button onClick={toggleDrawer(true)}>Add Lead</Button>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        <LeadForm id = {id} toggleDrawer={toggleDrawer(false)} setIds = {setIds}/>
        </Drawer>
        <LeadGrid id = {id} setIds ={setIds} toggleDrawer={toggleDrawer(false)} Opendr= {Opendr}/>
    </div>
  )
}
