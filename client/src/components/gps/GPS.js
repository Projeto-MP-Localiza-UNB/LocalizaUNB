import React, { useEffect, useState } from 'react';
import './GPS.css';

const GPS = ({ showCoordinates, showHeader }) => {
  const [coordenadas, setCoordenadas] = useState([]);
  const [message, setMessage] = useState('Obtendo localização...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoordenadas([latitude, longitude]);
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
  }, []);

  return (
    <>
      {coordenadas.length ? (
        <div className="gps-container">
          {showHeader ? <p>Sua localização</p> : null}

          <gmp-map
            center={coordenadas.join(', ')}
            zoom="12"
            map-id="DEMO_MAP_ID"
          >
            <gmp-advanced-marker
              position={coordenadas.join(', ')}
              title="My location"
            ></gmp-advanced-marker>
          </gmp-map>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
};

export default GPS;
