import './Rssnews.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CircularProgress from '@material-ui/core/CircularProgress';


function Rssnews(props) {

  const [data, setData] = React.useState(null);
  const [showArticle, asetaShowArticle] = React.useState(false)
  const [setArticle, asetaSetArticle] = React.useState()

  React.useEffect(() => {

    setTimeout(() => {
      fetch("https://react-projects-servers.herokuapp.com/rss-server") // NodeJS servu, jossa RSS-feedit käsitellään
        .then((res) => res.json())
        .then((data) => setData(data));
    }, 1000) // näytetään ainakin sekunti hieno loading screen :D

  }, []);

  const AvaaUutinen = (item) => {

    console.log(typeof item.artikkeli)

    asetaShowArticle(true) 
    asetaSetArticle(ReactHtmlParser(item.artikkeli)) 

  }

  return (
    
    <div className="Rssnews">

      <br />
      
      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

        <div className="rssArtikkeli" style={{ display: showArticle ? 'block' : 'none '}}>
          <p>{setArticle}</p>
        </div>

        <div className="rssUutiset">
          {!data ? <CircularProgress color="secondary" /> : <ListaaData list={data[0]} uutinenNappi={AvaaUutinen} />}
        </div>

    </div>
    
  );
  
}



const ListaaData = (props) => {

  return (
		<div>
			{props.list.map((item) => (      
        <div className="rssUutinen">
          <h1>{item.otsikko}</h1>
          <button onClick={() => props.uutinenNappi(item)}> Avaa uutinen </button>
        </div>
			))}
		</div>
  );

}



export default Rssnews;