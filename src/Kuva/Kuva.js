import './Kuva.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ImageUploading from "react-images-uploading";


function Kuva(props) {

  const [images, setImages] = React.useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    
    <div className="Kuva">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, isDragging, dragProps, }) => (

          <div>
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image['data_url']} alt="" width="100" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

    </div>

  );
  
}




export default Kuva;