import './Kuva.css';
import React from 'react';
import Button from '@material-ui/core/Button';


function Kuva(props) {


  return (
    
    <div>

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>


    </div>
    
  );
  
}


export default Kuva;