export interface CelestialBodyData {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'dwarf-planet' | 'moon';
  diameter: number; // km
  mass?: number; // kg
  distanceFromSun?: number; // million km
  orbitalPeriod?: number; // Earth days
  rotationPeriod?: number; // Earth days
  color: string;
  texture?: string;
  description?: string;
}