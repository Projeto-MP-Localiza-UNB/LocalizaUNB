/* eslint-disable no-undef */
export default class GPSService {
  static async init(el, coordinates = null) {
    const { Map } = await google.maps.importLibrary('maps');

    return new Map(el, {
      zoom: 14,
      center: coordinates,
      mapId: 'MAP_ID',
      disableDefaultUI: true,
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
}
