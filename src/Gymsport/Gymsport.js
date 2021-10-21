import './Gymsport.css';
import React from 'react';
import Button from '@material-ui/core/Button';


function Gymsport(props) {

  return (
    
    <div className="gymsport">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>



    </div>
    
  );
  
}



export default Gymsport;