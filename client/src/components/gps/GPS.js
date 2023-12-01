import React, { useEffect, useState, useRef, useCallback } from 'react';

import Loading from '../../shared/loading/Loading';

import './GPS.css';
import GPSService from './GPSService';

const UNBcoordinates = { lat: -15.766097, lng: -47.870604 };

const GPS = ({ userCoordinates, marker, setMarker }) => {
  const [coordenadas, setCoordenadas] = useState({ lat: null, lng: null });
  const [message, setMessage] = useState('Obtendo localização...');
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
    async function getMap() {
      await GPSService.init(
        mapRef.current,
        coordenadas.lat && coordenadas.lng ? coordenadas : UNBcoordinates
      ).then((map) => {
        setMap(map);
        map.addListener('click', (e) => {
          GPSService.setLocation(e, map).then(updateMarker);
        });
      });
      setLoading(false);
    }
    if (!map) getMap();
    marker?.setMap(map);
  }, [mapRef, coordenadas, map, marker, updateMarker]);

  useEffect(() => {
    if (userCoordinates) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordenadas({ lat: latitude, lng: longitude });
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
  }, []);

  return (
    <>
      <div className="gps-container">
        <Loading
          status={loading}
          fitContainer={true}
          message="Carregando mapa"
        />
        <div ref={mapRef} className="map"></div>
      </div>
    </>
  );
};

export default GPS;
