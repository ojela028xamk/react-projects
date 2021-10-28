import './Rssnews.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CircularProgress from '@material-ui/core/CircularProgress';


function Rssnews(props) {

  const [data, setData] = React.useState(null);
  const [showArticle, setShowArticle] = React.useState(false)

  // objekti useState
  const [parseArticle, setParseArticle] = React.useState(
    {
      parseotsikko: null,
      parseartikkeli: null,
      parselinkki: null  
    })


  React.useEffect(() => {

    /*fetch("https://react-projects-servers.herokuapp.com/rss-server")*/

    fetch("http://localhost:3001/rss-server") // NodeJS servu, jossa RSS-feedit käsitellään
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);

  const AvaaUutinen = (item) => {

    setShowArticle(true)

    setParseArticle({
      parseotsikko: item.otsikko,
      parseartikkeli: ReactHtmlParser(item.artikkeli),
      parselinkki: item.linkki  
    })

  }

  return (
    
    <div className="Rssnews">

      <br />
      
      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

        <div className="rssArtikkeli" style={{ display: showArticle ? 'block' : 'none' }}>
          <div className="rssArtikkeliContent">
            <button onClick={() => setShowArticle(false)}>Sulje ikkuna</button>

            <h1>{parseArticle.parseotsikko}</h1>
            <p>{parseArticle.parseartikkeli}</p>
            {parseArticle.parselinkki === undefined ? null : <a href={parseArticle.parselinkki} target="_blank">Avaa uutinen</a> }
          </div>
        </div>

        <div className="rssUutiset">
          {!data ? <CircularProgress color="secondary" /> : <ListaaData list={data[0]} uutinenNappi={AvaaUutinen} />}
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
		<div>

      <button onClick={() => setRssFilter('Yle')}>YLE</button>
      <button onClick={() => setRssFilter('Iltalehti')}>ILTALEHTI</button>

			{filterData.map((item) => (      
        <div className="rssUutinen">
          <h1>{item.otsikko}</h1>
          <button onClick={() => props.uutinenNappi(item)}> Avaa uutinen </button>
        </div>
			))}

		</div>
  );

}



export default Rssnews;