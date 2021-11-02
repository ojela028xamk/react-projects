import './Rssnews.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


function Rssnews(props) {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    /* fetch("https://react-projects-servers.herokuapp.com/rss-server") */

    fetch("http://localhost:3001/rss-server") // NodeJS servu, jossa RSS-feedit käsitellään
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);


  return (
    
    <div className="Rssnews">


      <br />
      
      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

      <h1>Uutissivusto</h1>

      <div className="rssFlex">
        {!data ? <CircularProgress color="secondary" /> : <ListaaData list={data[0]} />}
      </div>

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
      <button onClick={() => setRssFilter('Yle')} className="filterNappi">Yle</button>
      <button onClick={() => setRssFilter('Iltalehti')} className="filterNappi">Iltalehti</button>
      <button onClick={() => setRssFilter('Iltasanomat')} className="filterNappi">Iltasanomat</button>
      <button onClick={() => setRssFilter('Kauppalehti')} className="filterNappi">Kauppalehti</button>
    </div>

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