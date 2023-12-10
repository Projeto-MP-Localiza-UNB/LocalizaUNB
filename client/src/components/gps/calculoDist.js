
/**
 * Calcula a distância entre duas coordenadas geográficas utilizando a fórmula de Haversine.
 *
 * @param {Object} coord1 - As coordenadas da primeira localização.
 * @param {number} coord1.lat - A latitude da primeira localização.
 * @param {number} coord1.lng - A longitude da primeira localização.
 * @param {Object} coord2 - As coordenadas da segunda localização.
 * @param {number} coord2.lat - A latitude da segunda localização.
 * @param {number} coord2.lng - A longitude da segunda localização.
 * @returns {number} A distância entre as duas localizações em quilômetros.
 */
export const conversaoCoord = (coord1, coord2) => {
    const R = 6371; // Raio médio da Terra em quilômetros
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.lat * (Math.PI / 180)) *
        Math.cos(coord2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distância em quilômetros
  
    return distance;
    
  };
  
export const calculaDistancia = (userCoordinates, lojaCoordinates) => {
    if (userCoordinates && lojaCoordinates) {
      const distance = conversaoCoord(userCoordinates, lojaCoordinates);

      return distance.toFixed(2);
    }
  };