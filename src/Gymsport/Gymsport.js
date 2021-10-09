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

const valinnat = []

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

    valinnat.push(item.title)

    asetaValinnatLista([...valinnat])

  }

  return (
    
    <div className="gymsport">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>


      
      <div className="gymsport_flex">

        <div className="gymsport_category">
          <button className="gymsport_nappi" onClick={() => asetaCategory("Liikkeet")}> Kaikki liikkeet </button>
          <button className="gymsport_nappi" onClick={() => asetaCategory("Bicep")}> Bicep </button>
          <button className="gymsport_nappi" onClick={() => asetaCategory("Chest")}> Chest </button>
        </div>

        <div className="gymsport_list">
          <GymLista gymlista={filterLiikkeet} siirraValinta={handleValinta} />
        </div>

      </div>

      <div className="gymsport_flex2">

        <div className="gymsport_program">

        </div>

        <div className="gymsport_selection">
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
        <h1>{item}</h1>
      </div>
    )))

}

export default Gymsport;