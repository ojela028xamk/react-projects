import './App.css';
import React from 'react';
import Wishlist from "../Wishlist/Wishlist";
import Budget from "../Budget/Budget";
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import ylabanneri from './banneri-01.png';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import budget_tausta from './budjetti.png';
import HealingIcon from '@material-ui/icons/Healing';

function App() { 

const [sivu, asetaSivu] = React.useState("App");

/* Vaihda tausta komponentin mukaan */
React.useEffect(() => { 
  switch (sivu) {
    case "App":
      document.body.style.background = '#8d99ae';
      break;
    case "Wishlist":
      document.body.style.background = 'linear-gradient(47deg, rgba(0,236,255,1) 0%, rgba(178,9,255,1) 100%)';
      break;
    case "Budget":
      document.body.style.backgroundImage = `url(${budget_tausta})`;
      break;
    default:
      document.body.style.background = 'white';
  }
}, [sivu], ); /* Käytä efektiä, kun variable vaihtuu */

const handleEtusivu = function() {
  asetaSivu("App");
}

  return (
    <>

      <div className="ylabanneri" style={{ 
        /*backgroundImage: `url(${ylabanneri})`,*/
        display: sivu === "App" ? "block" : "none"
        }} >
        <div className="ylabanneri_text">
          <h3>ReactJS Projekteja</h3>
          <p className="header_p">Täältä löytyy kaikki React-kirjaston avulla luodut ohjelmat. 
          Tekijä Jere Länsipii.</p>
        </div>
      </div>
      
      <div className="index" style={{ display: sivu === "App" ? "grid" : "none" }}>

          <div className="kortti">
            <div className="korttiKuva">
              <LocalHospitalIcon style={{ 
                width: "100%",
                height: "auto",
                color: "black" }} />
            </div> 
            <div className="korttiTeksti">
              <h2>ROKOTEDATAA</h2>
              <p>Solita Dev Akatemian työnhakutehtävä, joka näyttää rokotedataa. 
                 Sivusto näyttää esim. rokotteiden määrän valmistajan mukaan, rokotettujen
                 sukupuolijakauman jne.</p>
              <Button onClick={(e) => {
                e.preventDefault(); 
                window.location.href='https://lansipii-vaccine-data.firebaseapp.com/';
                }} variant="outlined" color="inherit"> Avaa {">>"} </Button>
            </div>
          </div>

          <div className="kortti kortti-1">
            <div className="korttiKuva">
              <img className="logo" src={logo1} />
            </div> 
            <div className="korttiTeksti">
              <h2>TOIVELISTA PELEILLE</h2>
              <p>Ohjelma, jonka avulla voidaan lisätä ja poistaa videopelejä toivelistalta. Pelejä voidaan
                myös suodattaa pelialustan mukaan. Pelilista tallentuu paikallisesti selaimeen.

              </p>
              <Button variant="outlined" color="inherit" onClick={() => asetaSivu("Wishlist")}> Avaa {">>"} </Button>
            </div>
          </div>

          <div className="kortti kortti-2">
            <div className="korttiKuva">
              <img className="logo" src={logo2} />
            </div> 
            <div className="korttiTeksti">
              <h2>BUDJETTILASKURI</h2>
              <p>Ohjelma, johon voidaan asettaa oma budjetti ja listata kuluja.
                Ohjelma näyttää myöskin kuinka paljon budjetista on käytetty ja kuinka paljon
                rahaa on jäljellä. Budjetti ja kululista tallentuu paikallisesti selaimeen.
              </p>
              <Button variant="outlined" color="inherit" onClick={() => asetaSivu("Budget")}> Avaa {">>"} </Button>
            </div>
          </div>

          <div className="kortti">
            <div className="korttiKuva">
            <HealingIcon style={{ 
                width: "100%",
                height: "auto",
                color: "black" }} />
            </div> 
            <div className="korttiTeksti">
              <h2>UUSI PROJEKTI</h2>
              <p>Tulevaisuuden projekti...
              </p>           
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
