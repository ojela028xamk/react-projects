import './Kuva.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ImageUploading from "react-images-uploading";


function Kuva(props) {

  const [images, setImages] = React.useState([]);
  const [nappula, setNappula] = React.useState("naytaUpload");
  const maxNumber = 1;

  const onChange = (imageList) => {
    
    setImages(imageList);
    setNappula("piilotaUpload")

  };

  return (
    
    <div className="Kuva">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps }) => (
      <>
          <div>

            {/* Upload kuva ensimmäistä kertaa */}
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}
            style={{ 
              display: nappula === "naytaUpload" ? "block" : "none" // Piilota ekan uploadin jälkeen
              }}> Lisää kuva... </button>

            &nbsp;

            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image['data_url']} alt="" width="150" />
                <div>
                  <button onClick={() => onImageUpdate(index)}>Lataa uusi kuva...</button> {/* Näytä ekan uploadin jälkeen */}
                </div>
              </div>
            ))}

          </div>
                      
          <EfektiLista lista={imageList}/>

      </>
      )}
      </ImageUploading>

    </div>

  );
  
}


const EfektiLista = (props) => {


  return (
  <div className="efektiLista">
    {props.lista.map((image, index) => (
      <div key={index}>
        <img src={image['data_url']} alt="" width="150" />
        <img src={image['data_url']} alt="" width="150" />
        <img src={image['data_url']} alt="" width="150" />
        <img src={image['data_url']} alt="" width="150" />
        <img src={image['data_url']} alt="" width="150" />
        
      </div>
      
    ))}
  </div>
  )
}



export default Kuva;