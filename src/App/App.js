import React from 'react';
import Wishlist from "../Wishlist/Wishlist";
import Blank from "../Blank/Blank";

function App() {

const [sivu, asetaSivu] = React.useState("App");

const handleEtusivu = function() {
  asetaSivu("App");
}

  return (
    <>
      <div style={{ display: sivu === "App" ? "block" : "none" }}>
        <h1>Etusivu</h1>
        <button onClick={() => asetaSivu("Wishlist")}>Wishlist</button>
        <button onClick={() => asetaSivu("Blank")}>Blank</button>
      </div>
      <div>
        {sivu === "Wishlist" && <Wishlist onClick={handleEtusivu}/>}
        {sivu === "Blank" && <Blank onClick={handleEtusivu}/>}
      </div>
    </>
  );

}


export default App;
