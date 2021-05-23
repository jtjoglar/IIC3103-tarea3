import React, { useState, useEffect, useRef } from 'react';
import socket from './Socket';
import '../App.css';
import { MapContainer, TileLayer, CircleMarker, Marker } from 'react-leaflet';


const Flights = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        socket.emit('FLIGHTS');
        socket.on('FLIGHTS', function(data){
            setFlights((prev) => ([...prev, ...data]))
            })
        return () => socket.disconnect();
    }, [])
    
    return (
      <div className="flights">
          <h2>Información de Vuelos</h2>
          {flights.map((vuelo, key) => {
              if (flights.length > 0){
                  return(
                      <div key={key}>
                      <h3>{vuelo.code}</h3>
                      <li>Aerolínea: {vuelo.airline}</li>
                      <li>Origen: {vuelo.origen}</li>
                      <li>Destino: {vuelo.destination}</li>
                      <li>Avión: {vuelo.plane}</li>
                      <li>Número de asientos: {vuelo.seats}</li>
                      <li>Pasajeros: <ol>{vuelo.passengers.map((pasajero, key) => {
                          if (vuelo.passengers.length > 0){
                              return (
                                  <div key={key}>
                                  <li>Nombre: {pasajero.name} | Edad: {pasajero.age}</li>
                                  </div>
                              )
                          }
                      })}</ol>
                      </li>
                      </div>
                  )
              }
          })}
      </div>
    );
  };


export default Flights;