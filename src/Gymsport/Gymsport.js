import './Gymsport.css';
import React from 'react';
import Button from '@material-ui/core/Button';


const liikkeet = [
  {
    title: "Bicep curl",
    target: "Bicep",
    type: "Dumbell"
  },
  {
    title: "Pushup",
    target: "Chest",
    type: "Bodyweight"
  }
]

function Gymsport(props) {


  return (
    
    <div className="gymsport">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>


      <GymLista gymlista={liikkeet} />


    </div>
    
  );
  
}

const GymLista = (props) => {

  return (
    props.gymlista.map(item => (

     <div>
       <h2>{item.title}</h2>
     </div>

    )))
}


export default Gymsport;