import React, { useState, useEffect, useRef } from 'react';
import socket from './Socket';
import '../App.css';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, Marker } from 'react-leaflet';
import {icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';

/*const avion = icon({
  iconUrl: '../avion.png',
  iconSize: [25, 25]
})*/

const Map = () => {
    const [posiciones, setPosiciones] = useState([]);
    const [posactual, setPosactual] = useState([]);
    const [flights, setFlights] = useState([]);

    

    useEffect(() => {
        socket.emit('FLIGHTS');
        socket.on('FLIGHTS', function(data){
            setFlights((prev) => ([...prev, ...data]))
            })
        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        socket.on('POSITION', function(data){
            setPosiciones((prev) => ([...prev, data]));
            let aux = posactual;
            let aux2 = true;
            for(let i = 0; i < posactual.length; i++){
              if(data.code === posactual[i].code){
                aux2 = false;
                aux[i] = data
              }
            }
            if(aux2){
              aux.push(data);
            }
            
            setPosactual(aux);
        })
    }, [])   

    //console.log(posactual);
  
    return (
      <div>
        <div className="map__container">
          <MapContainer center={[0, 0]} zoom={2} maxZoom={12} minZoom={2} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {posiciones.map((pos, key) =>{
                if (posiciones.length > 0) {
                  if (pos){
                      return (
                          <CircleMarker key={key} center={pos.position} radius={1}></CircleMarker>
                      )
                  }
              }
              })
            }

            {posactual.map((actual, key) => {
              if(posactual.length > 0){
                if (actual){
                  return (
                    <CircleMarker key={key} center={actual.position} radius={3} color='red' weight='4'></CircleMarker>
                  )
                }
              }
            })}

            {flights.map((vuelo, key) =>{
              if (flights.length > 0){
                return (
                  <Polyline key={key} positions={[vuelo.origin, vuelo.destination]} color='DarkGrey' weight='3' dashArray='5, 10'></Polyline>
                )
              }
            })}
            
          </MapContainer>
        </div>
        <div className="flights">
          <h2>Información de Vuelos</h2>
          {flights.map((vuelo, key) => {
              if (flights.length > 0){
                  return(
                      <div key={key}>
                      <h3>{vuelo.code}</h3>
                      <li>Aerolínea: {vuelo.airline}</li>
                      <li>Origen: {vuelo.origin}</li>
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
      </div>
    );
  };


export default Map;