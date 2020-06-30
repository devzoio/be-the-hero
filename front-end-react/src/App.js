import React/**, { useState }*/ from 'react';

// JSX - Javascript XML (quando HTML tá dentro da função)

import './global.css';

import Routes from './routes'

export default function App() {
  //conceito de estado
  //const [counter, setCounter] = useState(0);

  // UseState retorna = Array [valor, função de Atualização]

  //function increment() {
  //  setCounter(counter + 1);
  //}

  return (
    <Routes />
  );
  //Contador: { counter }
  //<button onClick={increment}>Incrementar</button>
}
