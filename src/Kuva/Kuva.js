import './Kuva.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ImageUploading from "react-images-uploading";


function Kuva(props) {

  const [images, setImages] = React.useState([]);
  const [effekti, setEffekti] = React.useState();

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const MuutaFilter = (event) => {

    switch (event.target.id) {
      case "eff_1":
        setEffekti({filter: 'grayscale(100%)'})
        break;
      case "eff_2":
        setEffekti({filter: 'invert(100%)'})
        break;
    }
  
  }

  
  return (
    
    <div className="Kuva">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, isDragging, dragProps, }) => (
        <>
          <div>
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image['data_url']} alt="" width="200" style={effekti}/>
                <button><a href={image['data_url']} download target="_blank">some link</a></button>
              </div>
            ))}
          </div>

          <EfektiLista kuvat={images} filtteri={MuutaFilter}/>

              

        </>
        )}
      </ImageUploading>

    </div>
    
  );
  
}


const EfektiLista = (props) => {

  return (
    <div>

       {props.kuvat.map((image, index) => (
        <div key={index}>
         
          <img id="eff_1" className="grayscale" src={image['data_url']} alt="" width="200" onClick={props.filtteri}/>
  
          <img id="eff_2" className="invert" src={image['data_url']} alt="" width="200" onClick={props.filtteri}/>

        </div>
      
       ))}

    </div>
 
  )

}


export default Kuva;