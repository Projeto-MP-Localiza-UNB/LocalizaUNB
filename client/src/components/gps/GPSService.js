/* eslint-disable no-undef */
export default class GPSService {
  static async init(el, coordinates = null, draggable = false) {
    const { Map } = await google.maps.importLibrary('maps');

    return new Map(el, {
      zoom: 14,
      center: coordinates,
      mapId: 'MAP_ID',
      disableDefaultUI: true,
      draggable: draggable,
    });
  }

  static setLocation(e, map) {
    const coordinates = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    return this.addMarker(map, coordinates);
  }

  static async addMarker(map, coordinates) {
    return new google.maps.Marker({
      map: map,
      draggable: true,
      position: coordinates,
      animation: google.maps.Animation.DROP,
    });
  }

  static getMarkerPosition(marker) {
    return {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };
  }
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  static getUserMarkerPosition(map, coordinates) {
    return new google.maps.Marker({
      map: map,
      position: coordinates,
      animation: google.maps.Animation.DROP,
      title: 'Você está aqui! XD',
    });
  }
}
