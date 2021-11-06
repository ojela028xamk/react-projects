import './Rssnews.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


function Rssnews(props) {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    setTimeout(() => {
      fetch("https://react-projects-servers.herokuapp.com/rss-server") // NodeJS servu, jossa RSS-feedit käsitellään
      .then((res) => res.json())
      .then((data) => setData(data));
    }, 1000)
   
  }, []);


  return (
    
    <div className="Rssnews">

      <br />
      
      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <br />
      <br />

        {!data ? <CircularProgress color="secondary" /> : <ListaaData list={data[0]} />}

    </div>
    
  );
  
}

const ListaaData = (props) => {

  const [rssFilter, setRssFilter] = React.useState('Yle')

  const filterData = props.list.filter(uutinen => {
    return uutinen.sivu.includes(rssFilter)
  })

  return (
    <>
    <div className="rssNapit">
      <h1>Uutissivusto</h1>

      <button onClick={() => setRssFilter('Yle')} className="filterNappi">YLE</button>
      <button onClick={() => setRssFilter('Iltalehti')} className="filterNappi">ILTALEHTI</button>
      <button onClick={() => setRssFilter('Iltasanomat')} className="filterNappi">ILTA-SANOMAT</button>
      <button onClick={() => setRssFilter('Kauppalehti')} className="filterNappi">KAUPPALEHTI</button>
    </div>
    <h2>Näytetään: {rssFilter}</h2>
		<div className="rssUutiset">
     
			{filterData.map((item) => (      
        <div className="rssUutinen">
          <h1>{item.otsikko}</h1>
          <p>{item.artikkeli}</p>
          <a href={item.linkki} target="_blank"><button className="avaanewsNappi"> Avaa uutinen </button></a>
        </div>
			))}

		</div>
    </>
  );

}



export default Rssnews;