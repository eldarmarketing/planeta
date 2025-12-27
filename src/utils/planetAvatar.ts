// Planet avatars for users
const planets = [
  '/images/planets/mercury.svg',
  '/images/planets/venus.svg',
  '/images/planets/earth.svg',
  '/images/planets/mars.svg',
  '/images/planets/jupiter.svg',
  '/images/planets/saturn.svg',
  '/images/planets/uranus.svg',
  '/images/planets/neptune.svg',
  '/images/planets/pluto.svg',
];

// Get a planet avatar based on a string (name, id, etc.)
export function getPlanetAvatar(identifier: string | number): string {
  if (typeof identifier === 'number') {
    return planets[identifier % planets.length];
  }
  
  // Hash the string to get a consistent planet for each user
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return planets[Math.abs(hash) % planets.length];
}

// Get planet by index
export function getPlanetByIndex(index: number): string {
  return planets[index % planets.length];
}

export default planets;

