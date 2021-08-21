import React from 'react';
import Button from '@material-ui/core/Button';


function Blank(props) {

  return (

    <div>

      <br />

      <Button color="primary" variant="outlined" onClick={props.onClick}>{"<<"} Palaa etusivulle</Button>
     
      
    
    </div>
  );
  
}


export default Blank;