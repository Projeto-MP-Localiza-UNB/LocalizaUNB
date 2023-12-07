import { conversaoCoord } from './calculoDist';

describe('conversaoCoord', () => {
  test('Deve retornar a distância correta entre duas coordenadas', () => {
    const coord1 = { lat: -15.799389, lng: -47.864732 };
    const coord2 = { lat: -15.780148, lng: -47.929170 };
    const expectedDistance = 7.2212; // Distância aproximada em quilômetros

    const distance = conversaoCoord(coord1, coord2);

    expect(distance).toBeCloseTo(expectedDistance, 1);
  });

  test('Deve retornar 0 quando as coordenadas são iguais', () => {
    const coord1 = { lat: -15.799389, lng: -47.864732 };
    const coord2 = { lat: -15.799389, lng: -47.864732 };

    const distance = conversaoCoord(coord1, coord2);

    expect(distance).toBe(0);
  });

  test('Deve retornar a distância correta quando as coordenadas são inversas', () => {
    const coord1 = { lat: -15.799389, lng: -47.864732 };
    const coord2 = { lat: -47.864732, lng: -15.799389 };
    const expectedDistance = 4615.8295; // Distância aproximada em quilômetros

    const distance = conversaoCoord(coord1, coord2);

    expect(distance).toBeCloseTo(expectedDistance, 1);
  });
});