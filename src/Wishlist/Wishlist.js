import './Wishlist.css';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import pikachu from '../App/wishlist01.png';
import space from '../App/wishlist02.png';
import SearchIcon from '@material-ui/icons/Search';
import { v4 as uuidv4 } from 'uuid';

function Wishlist(props) {

  const pelilista = JSON.parse(localStorage.getItem("pelilista")) || [];

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );
  
    React.useEffect(() => {
      localStorage.setItem(key, value); // Funktio
    }, [value, key]); // Dependency array, jos var muuttuu -> funktio suoritetaan
  
    return [value, setValue];
  };
  
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const [pelit, setPelit] = React.useState(pelilista); // Pelilista
  const [pelivalue, setPelivalue] = React.useState('')
  const [alustavalue, setAlustavalue] = React.useState('Switch')
  const [alustafilter, setAlustafilter] = React.useState('All')

  const handleRemovePeli = item => { // Poista peli listalta
    const newPelit = pelit.filter(
      peli => item.objectID !== peli.objectID
    );

    setPelit(newPelit); // Update pelilista
    let storagepelit = JSON.stringify(newPelit);
    localStorage.setItem("pelilista", storagepelit);

  };

  const handleSearch = event => { setSearchTerm(event.target.value); };

  const handleAdd = function(e) { // Lisää peli

    e.preventDefault()

    let uusipeli = {
      title: pelivalue.charAt(0).toUpperCase() + pelivalue.slice(1), // Iso alkukirjain
      platform: alustavalue,
      objectID: uuidv4() // Random objectID
    }

    if (pelivalue.length === 0) { return; }

    const uusilista = [...pelit, uusipeli] // Nykyinen lista + uusi peli

    setPelit(uusilista) // Update pelilista
    let storagepelit2 = JSON.stringify(uusilista);
    localStorage.setItem("pelilista", storagepelit2);
    setPelivalue('')

  }

  // Filter alustan mukaan
  const filterAlusta = pelit.filter(function(pelit) {
    if (alustafilter === "All") {
      return pelit;
    } else {
      return pelit.platform.includes(alustafilter);
    }
  });

  const filterPelilista = filterAlusta.filter(peli => {
    return peli.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="Wishlist">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <h1 className="headeri">Videogame Wishlist<img src={space} /></h1>
      
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className="vasen_puoli">
            <img src={pikachu} />
          <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}>
            {/* h2 ja p = children. Component tagin sisällä. */}
            <h1>Search <SearchIcon style={{fontSize: '32px'}}/></h1>
          </InputWithLabel>
          <h1>Add a game</h1>
          <form onSubmit={handleAdd}>
            <TextField value={pelivalue} id="standard-basic" label="Game title" required='required' onChange={(e) => { setPelivalue(e.target.value); } }/>
            <br />
            <label>Platform: </label>
            <Select defaultValue="Switch" onChange={(e) => { setAlustavalue(e.target.value); } }>
              <MenuItem value="Switch">Switch</MenuItem>
              <MenuItem value="PC">PC</MenuItem>
              <MenuItem value="PS5">PS5</MenuItem>
              <MenuItem value="PS4">PS4</MenuItem>
              <MenuItem value="Xbox">Xbox</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <hr />
            <Button variant="outlined" color="primary" type="submit"> Add </Button>
          </form>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="oikea_puoli">
          <h1>Your Wishlist</h1>
          <label>Platform: </label>
          <Select defaultValue="All" onChange={(e) => { setAlustafilter(e.target.value); } }>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Switch">Switch</MenuItem>
            <MenuItem value="PC">PC</MenuItem>
            <MenuItem value="PS5">PS5</MenuItem>
            <MenuItem value="PS4">PS4</MenuItem>
            <MenuItem value="Xbox">Xbox</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <hr />
          <List list={filterPelilista} onRemoveItem={handleRemovePeli} /> {/* Instance of React Component */}
          </div>
        </Grid>
      </Grid>

    </div>
  );
}

const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <TextField label="Search game title" id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
};

const List = ({ list, onRemoveItem }) => // Definition of React component
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

const Item = ({ item, onRemoveItem }) => (
  <ListItem>
    <ListItemText>
      {item.title}&nbsp;
      <Chip label={item.platform} variant="outlined" />
    </ListItemText>
    <Button type="button" onClick={() => onRemoveItem(item)} color="secondary" size="small">
        <HighlightOffIcon />
    </Button>
  </ListItem>
);


export default Wishlist;
