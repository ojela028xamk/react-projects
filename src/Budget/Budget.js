import './Budget.css';
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { AppProvider } from './Context/AppContext';
import { AppContext } from './Context/AppContext';
import { v4 as uuidv4 } from 'uuid';


function Budget(props) {

  return (
    <AppProvider>
    <div className="Budget">

      <br />

      <Button color="primary" variant="outlined" onClick={props.onClick}>{"<<"} Palaa etusivulle</Button>
     
      <h1>Budget Calculator</h1>
      

      <Alert icon={false} variant="filled" severity="success">
        <Budjetti />
      </Alert>
        
      <Alert icon={false} variant="filled" severity="warning">
        <Jaljella />
      </Alert>
      
      <Alert icon={false} variant="filled" severity="error">
        <Kulut />
      </Alert>

      <KulutLista />
      
      <LisaaKulu />
    
    </div>
    </AppProvider>
  );
  
}

const Budjetti = () => {

  const { budget } = useContext(AppContext);

  return (
		<div>
			<h3>Budget: {budget}</h3>
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
			<span>Remaining: £{budget - totalExpenses}</span>
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
			<span>Spent so far: {totalExpenses} € </span>
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
			{props.name}
			<div>
				<span>
					{props.cost} €
				</span>
				<button onClick={handleDeleteExpense}>Delete</button>
			</div>
		</li>
	);
}

const LisaaKulu = () => {

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

        <label>Name: </label>
        <input required='required' type="text" id='name' value={nimi} onChange={(e) => setNimi(e.target.value)}></input>
        <br />
        <label>Cost: </label>
        <input required='required' type="text" id='cost' value={kulu} onChange={(e) => setKulu(e.target.value)}></input>
        <br />
        <button type="submit">Add expense</button>

      </form>
    </>
  );

}

export default Budget;