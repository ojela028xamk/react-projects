import './App.css';
import React from 'react';
import Wishlist from "../Wishlist/Wishlist";
import Blank from "../Blank/Blank";
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

        <h1 style={{ fontSize: "50px" }}>ReactJS Ohjelmia</h1>

      </div>
      
      <div className="index" style={{ display: sivu === "App" ? "flex" : "none" }}>

          <div className="kortti">
            <div className="korttiKuva">
              {LocalHospitalIcon}
            </div> 
            <div className="korttiTeksti">
              <h2>Rokotedataa</h2>
              <p>Ohjelma, jonka avulla voidaan lisätä ja poistaa videopelejä toivelistalta.

              </p>
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
          

      </div>

      <div>
        {sivu === "Wishlist" && <Wishlist onClick={handleEtusivu}/>}
        {sivu === "Blank" && <Blank onClick={handleEtusivu}/>}
      </div>

    </>
  );

}


export default App;
