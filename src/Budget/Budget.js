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

function Budget(props) {

  return (
    <AppProvider>
    <div className="Budget">

      <br />

      <Button variant="outlined" type="submit" onClick={props.onClick}> {"<<"} Palaa etusivulle</Button>
     
      <h1 className="budget_header">BUDGET CALCULATOR</h1>
      
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
          <h1>Expenses</h1>
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

  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Add budget</h1>
      <input required='required' type="text" id='raha' value={raha} onChange={(e) => setRaha(e.target.value)}></input>
      <br />
      <br />
      <Button classes={{root: classes.root}} variant="outlined" type="submit">Add budget</Button>
    </form>
  );

}

const Budjetti = () => {

  const { budget } = useContext(AppContext);

  return (
		<div>
			<span style={{fontSize: '28px'}}><AccountBalanceIcon style={{fontSize: '28px', marginBottom: '-5px'}} /> <b>Budget <br/> {budget} €</b></span>
		</div>
	);

}

const Jaljella = () => {
  
  const { expenses, budget } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total = total + item.cost);
	}, 0);

	return (
		<div>
			<span style={{fontSize: '20px'}}><AttachMoneyIcon style={{marginBottom: '-5px'}}/> Remaining <br/> {budget - totalExpenses} €</span>
		</div>
	);

}

const Kulut = () => {

  const { expenses } = useContext(AppContext);

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	return (
		<div>
			<span style={{fontSize: '20px'}}><MoneyOffIcon style={{marginBottom: '-5px'}}/> Money spent <br/> {totalExpenses} €</span>
		</div>
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
        <DeleteForeverIcon style={{marginBottom: '5px'}}/>
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

  }

  return (
    <>
      <h1>Add expense</h1>
      <form onSubmit={onSubmit}>

        <label>Item</label>
        <br />
        <input required='required' type="text" id='name' value={nimi} onChange={(e) => setNimi(e.target.value)} />
        <br />
        <br />
        <label>Cost (€)</label>
        <br />
        <input required='required' type="text" id='cost' value={kulu} onChange={(e) => setKulu(e.target.value)} />
        <br />
        <br />
        <Button classes={{root: classes.root}} variant="outlined" type="submit">Add expense</Button>

      </form>
    </>
  );

}

export default Budget;