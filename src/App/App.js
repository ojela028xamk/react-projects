import './App.css';
import React from 'react';
import Wishlist from "../Wishlist/Wishlist";
import Budget from "../Budget/Budget";
import logo1 from './logo1.png';
import ylabanneri from './banneri-01.png';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

function App() {

const [sivu, asetaSivu] = React.useState("App");

const handleEtusivu = function() {
  asetaSivu("App");
}

  return (
    <>

      <div className="ylabanneri" style={{ 
        backgroundImage: `url(${ylabanneri})`,
        display: sivu === "App" ? "block" : "none"
        }} >

      </div>
      
      <div className="index" style={{ display: sivu === "App" ? "grid" : "none" }}>

          <div className="kortti">
            <div className="korttiKuva">
              <LocalHospitalIcon style={{ 
                width: "150px",
                height: "150px" }} />
            </div> 
            <div className="korttiTeksti">
              <h2>Rokotedataa</h2>
              <p>Solita Dev Akatemian työnhakutehtävä, joka näyttää rokotedataa. </p>
              <Button onClick={(e) => {
                e.preventDefault(); 
                window.location.href='https://lansipii-vaccine-data.firebaseapp.com/';
                }} variant="outlined" color="primary"> Avaa {">>"} </Button>
            </div>
          </div>

          <div className="kortti">
            <div className="korttiKuva">
              <img className="logo" src={logo1} />
            </div> 
            <div className="korttiTeksti">
              <h2>Toivelista videopeleille</h2>
              <p>Ohjelma, jonka avulla voidaan lisätä ja poistaa videopelejä toivelistalta.

              </p>
              <Button variant="outlined" color="primary" onClick={() => asetaSivu("Wishlist")}> Avaa {">>"} </Button>
            </div>
          </div>

          <div className="kortti">
            <div className="korttiKuva">
              <img className="logo" src={logo1} />
            </div> 
            <div className="korttiTeksti">
              <h2>Budjettilaskuri</h2>
              <p>Budjettilaskuri.</p>
              <Button variant="outlined" color="primary" onClick={() => asetaSivu("Budget")}> Avaa {">>"} </Button>
            </div>
          </div>
          
      </div>

      <div>
        {sivu === "Wishlist" && <Wishlist onClick={handleEtusivu}/>}
        {sivu === "Budget" && <Budget onClick={handleEtusivu}/>}
      </div>

    </>
  );

}


export default App;
