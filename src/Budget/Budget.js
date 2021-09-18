import './Budget.css';
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { AppProvider } from './Context/AppContext';
import { AppContext } from './Context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  root: {
    color: 'white',
    borderColor: 'white',
  },
});

// localStorage.removeItem("state");

function Budget(props) {

  const classes = useStyles();
  
  return (
    <AppProvider>

    <div className="Budget">

      <br />

      <Button classes={{root: classes.root}} variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>
     
      <h1 className="budget_header">Budjettilaskuri</h1>
      
      <div className="ylaosa">

          <div className="ylaosa_vasen">
            <LisaaBudjetti />
          </div>

          <div className="ylaosa_oikea">

            <div className="info">
              <Budjetti />
            </div>
              
            <div className="info">
              <Jaljella />
            </div>
            
            <div className="info">
              <Kulut />
            </div>

          </div>
          
      </div>

      <br />

      <div className="kulut">
        
        <div className="lisaakulu">
          <LisaaKulu />        
        </div>

        <div className="kulutlista">
          <h1>Kulut lista</h1>
          <KulutLista />
        </div>
        
      </div>

    </div>
    </AppProvider>
  );
  
}

const LisaaBudjetti = () => {

  const classes = useStyles();

  const { dispatch } = useContext(AppContext);

  const [raha, setRaha] = React.useState('');

  const onSubmit = (e) => {

    e.preventDefault();

    dispatch({
      type: 'ADD_BUDGET',
      payexp: raha,
    });

    setRaha('')

  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Lisää budjetti</h1>
      <input required='required' type="number" id='raha' value={raha} onChange={(e) => setRaha(e.target.value)}></input>
      <br />
      <br />
      <Button classes={{root: classes.root}} variant="outlined" type="submit">Lisää budjetti</Button>
    </form>
  );

}

const Budjetti = () => {

  const { budget } = useContext(AppContext);

  return (
    <>
			<div className="tabs_ikoni">
        <AccountBalanceIcon style={{fontSize: '46px', color: 'white'}} /> 
      </div>
      <div className="tabs_text">
        <b>Budjetti <br />{budget} €</b>
      </div>  
    </>
	);

}

const Jaljella = () => {
  
  const { expenses, budget } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total = total + item.cost);
	}, 0);

	return (
    <>
      <div className="tabs_ikoni">
        <AttachMoneyIcon style={{fontSize: '46px', color: 'white'}} /> 
      </div>
      <div className="tabs_text" style={{ color: budget - totalExpenses < 0 ? 'red' : 'white'}}>
        <b>Jäljellä <br />{budget - totalExpenses} €</b>
      </div>
    </>
	);

}

const Kulut = () => {

  const { expenses } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	return (
    <>
      <div className="tabs_ikoni">
          <MoneyOffIcon style={{fontSize: '46px', color: 'white'}} /> 
      </div>
      <div className="tabs_text">
          <b>Käytetty <br/> {totalExpenses} €</b>
      </div>
    </>
	);

}

const KulutLista = () => {

  const { expenses } = useContext(AppContext);

  return (
		<ul>
			{expenses.map((item) => (
				<KulutItem id={item.id} name={item.name} cost={item.cost} />
			))}
		</ul>
  );

}

const KulutItem = (props) => {

  const { dispatch } = useContext(AppContext);

	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

	return (
		<li>
      <span style={{fontSize: '22px'}}> {props.name} {props.cost} € </span>
      <Button type="button" onClick={handleDeleteExpense} size="medium">
        <DeleteForeverIcon style={{marginBottom: '5px', color: 'white'}}/>
      </Button>
		</li>
	);

}

const LisaaKulu = () => {

  const classes = useStyles();
  const { dispatch } = useContext(AppContext);

  const [nimi, setNimi] = React.useState('');
  const [kulu, setKulu] = React.useState('');

  const onSubmit = (e) => {

    e.preventDefault();

    const expense = {
      id: uuidv4(),
      name: nimi,
      cost: parseInt(kulu),
    };

    dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});

    setNimi('')
    setKulu('')

  }

  return (
    <>
      <h1>Lisää kulu</h1>
      <form onSubmit={onSubmit}>

        <label>Kulu</label>
        <br />
        <input required='required' type="text" id='name' value={nimi} onChange={(e) => setNimi(e.target.value)} />
        <br />
        <br />
        <label>Hinta (€)</label>
        <br />
        <input required='required' type="number" id='cost' value={kulu} onChange={(e) => setKulu(e.target.value)} />
        <br />
        <br />
        <Button classes={{root: classes.root}} variant="outlined" type="submit">Lisää kulu</Button>

      </form>
    </>
  );

}

export default Budget;