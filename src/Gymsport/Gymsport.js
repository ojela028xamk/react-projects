import './Gymsport.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';


const liikkeet = [
  {
    title: "Bicep curl",
    target: "Bicep",
    type: "Dumbell",
    objectID: uuidv4()
  },
  {
    title: "Pushup",
    target: "Chest",
    type: "Bodyweight",
    objectID: uuidv4()
  }
]

function Gymsport(props) {

  const [category, asetaCategory] = React.useState("Liikkeet")
  const [valinnatLista, asetaValinnatLista] = React.useState([])

  const filterLiikkeet = liikkeet.filter(function(liike) {
    if (category === "Liikkeet") {
      return liikkeet;
    } else {
      return liike.target.includes(category);
    }
  });

  const handleValinta = function(item) { 

    let siirraliike = {
      title: item.title,
      objectID: item.objectID
    }

    if (valinnatLista.filter(e => e.objectID === item.objectID).length > 0) {
      return;
    }

    const uusivalinnat = [...valinnatLista, siirraliike] 

    asetaValinnatLista(uusivalinnat)

  }

  return (
    
    <div className="gymsport">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>


      
      <div className="gymsport_flex">

        <div className="gymsport_category">
          <h1>Liikke kategoriat</h1>
          <button className="gymsport_nappi" onClick={() => asetaCategory("Liikkeet")}> Kaikki liikkeet </button>
          <button className="gymsport_nappi" onClick={() => asetaCategory("Bicep")}> Bicep </button>
          <button className="gymsport_nappi" onClick={() => asetaCategory("Chest")}> Chest </button>
        </div>

        <div className="gymsport_list">
          <h1>Liikkeet</h1>
          <GymLista gymlista={filterLiikkeet} siirraValinta={handleValinta} />
        </div>

        <div className="gymsport_selection">
          <h1>Omat valinnat</h1>
          <ValintaLista valinnat={valinnatLista} />
        </div>

      </div>

    </div>
    
  );
  
}

const GymLista = (props) => {

  return (
    props.gymlista.map(item => (
      <div>
        <h2>{item.title}</h2>
        <button onClick={() => props.siirraValinta(item)}> Siirrä liikelistaan </button>
      </div>
  )))

}

const ValintaLista = (props) => {

  return (
    props.valinnat.map(item => (
      <div>
        {item.title}
      </div>
    )))

}

export default Gymsport;