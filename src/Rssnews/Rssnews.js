import './Rssnews.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


function Rssnews(props) {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
      fetch("http://localhost:3001/rss-server")
        .then((res) => res.json())
        .then((data) => setData(data));
        console.log(data)
  }, []);

  return (
    
    <div className="Rssnews">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>

        <div className="rssUutiset">
          {!data ? "Loading..." : <ListaaData list={data[0]} />}
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
          { ReactHtmlParser(item.artikkeli) }
        </div>

			))}
		</div>
  );

}



export default Rssnews;