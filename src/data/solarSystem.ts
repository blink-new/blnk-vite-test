import { CelestialBodyData } from '../types/solarSystem';

export const solarSystemData: CelestialBodyData[] = [
  {
    id: 'sun',
    name: 'Sun',
    type: 'star',
    diameter: 1392700,
    color: '#FDB813',
    texture: '/textures/sun.jpg',
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    rotationPeriod: 58.6,
    color: '#A5A5A5',
    texture: '/textures/mercury.jpg',
    description: 'Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets.'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 224.7,
    rotationPeriod: -243, // Negative indicates retrograde rotation
    color: '#E5C04F',
    texture: '/textures/venus.jpg',
    description: 'Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the second-brightest natural object in the night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight.'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.2,
    rotationPeriod: 1,
    color: '#2E75FF',
    texture: '/textures/earth.jpg',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating and other evidence, Earth formed over 4.5 billion years ago.'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    rotationPeriod: 1.03,
    color: '#E27B58',
    texture: '/textures/mars.jpg',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    diameter: 142984,
    distanceFromSun: 778.6,
    orbitalPeriod: 4331,
    rotationPeriod: 0.41,
    color: '#E3A857',
    texture: '/textures/jupiter.jpg',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    diameter: 120536,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10747,
    rotationPeriod: 0.45,
    color: '#C9AB68',
    texture: '/textures/saturn.jpg',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine times that of Earth. It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    diameter: 51118,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30589,
    rotationPeriod: -0.72, // Negative indicates retrograde rotation
    color: '#75CEE5',
    texture: '/textures/uranus.jpg',
    description: 'Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    diameter: 49528,
    distanceFromSun: 4495.1,
    orbitalPeriod: 59800,
    rotationPeriod: 0.67,
    color: '#3E54E8',
    texture: '/textures/neptune.jpg',
    description: 'Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus.'
  }
];