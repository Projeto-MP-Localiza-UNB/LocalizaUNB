import React, { useEffect, useState, useRef, useCallback } from 'react';

import Loading from '../../shared/loading/Loading';

import './GPS.css';
import GPSService from './GPSService';
import { calculaDistancia } from './calculoDist';

const UNBcoordinates = { lat: -15.766097, lng: -47.870604 };

const GPS = ({
  userCoordinates,
  marker,
  setMarker,
  showMessage = false,
  showLoadingMessage = true,
}) => {
  const [coordenadas, setCoordenadas] = useState({ lat: null, lng: null });
  const [message, setMessage] = useState('Obtendo sua localização...');
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  
  

  
  const updateMarker = useCallback(
    (m) =>
      setMarker((marker) => {
        marker?.setMap(null);
        return m;
      }),
    [setMarker]
  );

  useEffect(() => {
    // Initialize map
    async function getMap() {
      await GPSService.init(
        mapRef.current,
        coordenadas.lat && coordenadas.lng ? coordenadas : UNBcoordinates,
        !userCoordinates
      ).then((map) => {
        setMap(map);
        if (!userCoordinates) {
          map.addListener('click', (e) => {
            GPSService.setLocation(e, map).then(updateMarker);
          });
        } else {
          if (coordenadas.lat && coordenadas.lng) {
            GPSService.getUserMarkerPosition(map, coordenadas);
          }
        }
      });
      if (userCoordinates) setMessage('Você está aqui! :)');
      setLoading(false);
    }
    if (!map) getMap();

    // Set marker in map
    marker?.setMap(map);

    // Cleanup
    return () => {
      if (map && userCoordinates) {
        setMap(null);
      }
    };
  }, [mapRef, coordenadas, map, marker, updateMarker, userCoordinates]);

  useEffect(() => {
    if (userCoordinates) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordenadas({ lat: latitude, lng: longitude });
            console.log(`Usuario Dist: ${latitude}, ${longitude}`);

          
            // Exemplo de chamada da função para calcular a distância

            const lojaCoordinates = { lat: -15.766097, lng: -47.870604}; // Coordenadas fictícias da loja
            calculaDistancia({ lat: latitude, lng: longitude }, lojaCoordinates);
          },
          (error) => {
            console.error(error.message);
            switch (error.message) {
              case 'User denied Geolocation':
                setMessage('Por favor, permita o acesso a sua localização.');
                return;
              default:
                setMessage(
                  'Erro ao obter localização. Tente novamente mais tarde.'
                );
            }
            // Trate erros de obtenção de localização aqui.
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocalização não é suportada pelo navegador.');
        // Trate a falta de suporte à geolocalização aqui.
      }
    }
  }, [userCoordinates]);
  return (
    <>
      <div className="gps-container">
        <Loading
          status={loading}
          fitContainer={true}
          message={showLoadingMessage ? 'Carregando mapa' : ''}
        />
        <div ref={mapRef} className="map"></div>
      </div>
      {showMessage ? <p className="gps-message">{message}</p> : <></>}
    </>
  );
};

export default GPS;
