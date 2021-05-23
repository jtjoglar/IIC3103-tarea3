import React, { useState } from 'react';
import socket from './componentes/Socket';
import Chat from './componentes/Chat'
import Map from './componentes/Map'
//import Flight from './componentes/Flights'
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if(name !== ""){
      setRegistrado(true);
    } 
  }

  return (
    <div className="App">
      <h1>TAREA 3 - IIC3103</h1>
      <Map/>
      
      {
        !registrado &&
        <form onSubmit={registrar}>
          <label htmlFor="">User Name</label>
          <input value={name} onChange={e => setName(e.target.value)}/>
          <button>Ingresar</button>
        </form>
      }

      {
        registrado &&
          <Chat name={name}/>
      }
      
    </div>
  );
}

export default App;

