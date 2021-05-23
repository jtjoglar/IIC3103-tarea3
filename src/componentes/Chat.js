import React, { useState, useEffect, useRef } from 'react';
import socket from './Socket';
import '../App.css';

const Chat = ({name}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    console.log('Se recibe mensaje');
    socket.on('CHAT', message => {
      setMessages(prev => [...prev, message]);
    })


  }, [])

  const submit = (e) => {
    e.preventDefault();
    socket.emit("CHAT", {"name": name, "message": message});
    setMessage("");
  }

  return (
    <div>
      <div className="chat">
        {messages.map((e, i) => <div key={i}><div>{e.name} ({Date(e.date)}): {e.message}</div></div>)}
      </div>
      <div className="form">
        <form onSubmit={submit}>
          <label htmlFor="">Escribir Mensaje</label>
          <textarea name="" id="" cols="25%" rows="1" value={message} onChange={e => setMessage(e.target.value)}>
          </textarea>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;
