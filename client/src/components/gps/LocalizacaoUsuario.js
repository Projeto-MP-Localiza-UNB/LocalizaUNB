// LocalizacaoUsuario.js
import React, { useEffect, useState } from 'react';

const LocalizacaoUsuario = () => {
  const [coordenadas, setCoordenadas] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoordenadas({ latitude, longitude });
        },
        (error) => {
          console.error(error.message);
          // Trate erros de obtenção de localização aqui.
        }
      );
    } else {
      console.error('Geolocalização não é suportada pelo navegador.');
      // Trate a falta de suporte à geolocalização aqui.
    }
  }, []);

  return (
    <div>
      {coordenadas ? (
        <p>Coordenadas: {coordenadas.latitude}, {coordenadas.longitude}</p>
      ) : (
        <p>Obtendo localização...</p>
      )}
    </div>
  );
};

export default LocalizacaoUsuario;
