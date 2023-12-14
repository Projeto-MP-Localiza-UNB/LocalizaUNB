/* eslint-disable no-undef */
/**
 * Classe que representa o serviço de GPS.
 */
export default class GPSService {
  /**
   * Inicializa o mapa do Google com as opções fornecidas.
   * @param {HTMLElement} el - O elemento HTML onde o mapa será renderizado.
   * @param {google.maps.LatLngLiteral|null} coordinates - As coordenadas do centro do mapa.
   * @param {boolean} draggable - Indica se o mapa pode ser arrastado.
   * @returns {Promise<google.maps.Map>} Uma Promise que resolve com a instância do mapa.
   */
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

  /**
   * Define a localização do marcador no mapa.
   * @param {google.maps.MouseEvent} e - O evento de clique no mapa.
   * @param {google.maps.Map} map - A instância do mapa.
   * @returns {google.maps.Marker} O marcador adicionado ao mapa.
   */
  static setLocation(e, map) {
    const coordinates = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    return this.addMarker(map, coordinates);
  }

  /**
   * Adiciona um marcador ao mapa.
   * @param {google.maps.Map} map - A instância do mapa.
   * @param {google.maps.LatLngLiteral} coordinates - As coordenadas do marcador.
   * @returns {google.maps.Marker} O marcador adicionado ao mapa.
   */
  static async addMarker(map, coordinates) {
    return new google.maps.Marker({
      map: map,
      draggable: true,
      position: coordinates,
      animation: google.maps.Animation.DROP,
    });
  }

  /**
   * Obtém a posição do marcador.
   * @param {google.maps.Marker} marker - O marcador.
   * @returns {google.maps.LatLngLiteral} As coordenadas do marcador.
   */
  static getMarkerPosition(marker) {
    return {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };
  }
  
  /**
   * Adiciona um marcador para representar a posição do usuário no mapa.
   * @param {google.maps.Map} map - A instância do mapa.
   * @param {google.maps.LatLngLiteral} coordinates - As coordenadas do marcador.
   * @returns {google.maps.Marker} O marcador adicionado ao mapa.
   */
  static getUserMarkerPosition(map, coordinates) {
    return new google.maps.Marker({
      map: map,
      position: coordinates,
      animation: google.maps.Animation.DROP,
      title: 'Você está aqui! XD',
    });
  }
}
