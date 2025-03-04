import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Html as DreiHtml } from '@react-three/drei';
import { Vector3, TextureLoader, MeshStandardMaterial, MeshBasicMaterial } from 'three';
import { motion } from 'framer-motion';
import { solarSystemData } from '../data/solarSystem';
import { CelestialBodyData } from '../types/solarSystem';

// Fallback component to show while loading
const LoadingFallback = () => {
  return (
    <DreiHtml center>
      <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded">
        Loading planet...
      </div>
    </DreiHtml>
  );
};

// Simplified material component that doesn't use useTexture hook directly
const SafeTextureMaterial = ({ 
  textureUrl, 
  color, 
  emissive, 
  emissiveIntensity,
  isBasicMaterial = false
}: { 
  textureUrl?: string; 
  color: string; 
  emissive?: string;
  emissiveIntensity?: number;
  isBasicMaterial?: boolean;
}) => {
  // Don't use hooks conditionally - this was causing the error
  if (isBasicMaterial) {
    return (
      <meshBasicMaterial 
        color={color} 
        emissive={emissive} 
        emissiveIntensity={emissiveIntensity || 0}
      />
    );
  } else {
    return (
      <meshStandardMaterial 
        color={color} 
        emissive={emissive} 
        emissiveIntensity={emissiveIntensity || 0}
      />
    );
  }
};

// Separate texture loader component
const TexturedMaterial = ({ 
  textureUrl, 
  color, 
  emissive, 
  emissiveIntensity,
  isBasicMaterial = false
}: { 
  textureUrl: string; 
  color: string; 
  emissive?: string;
  emissiveIntensity?: number;
  isBasicMaterial?: boolean;
}) => {
  try {
    // Fix texture path by ensuring it starts with a slash
    const fixedTextureUrl = textureUrl.startsWith('/') ? textureUrl : `/${textureUrl}`;
    // Load texture safely
    const texture = useTexture(fixedTextureUrl);
    
    if (isBasicMaterial) {
      return (
        <meshBasicMaterial 
          color={color} 
          map={texture} 
          emissive={emissive} 
          emissiveIntensity={emissiveIntensity || 0}
        />
      );
    } else {
      return (
        <meshStandardMaterial 
          color={color} 
          map={texture} 
          emissive={emissive} 
          emissiveIntensity={emissiveIntensity || 0}
        />
      );
    }
  } catch (error) {
    console.error(`Error loading texture: ${textureUrl}`, error);
    // Fallback to non-textured material
    return (
      <SafeTextureMaterial 
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        isBasicMaterial={isBasicMaterial}
      />
    );
  }
};

// Material with error handling
const MaterialWithFallback = ({ 
  textureUrl, 
  color, 
  emissive, 
  emissiveIntensity,
  isBasicMaterial = false
}: { 
  textureUrl?: string; 
  color: string; 
  emissive?: string;
  emissiveIntensity?: number;
  isBasicMaterial?: boolean;
}) => {
  if (!textureUrl) {
    return (
      <SafeTextureMaterial 
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        isBasicMaterial={isBasicMaterial}
      />
    );
  }
  
  return (
    <Suspense fallback={
      <SafeTextureMaterial 
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        isBasicMaterial={isBasicMaterial}
      />
    }>
      <TexturedMaterial 
        textureUrl={textureUrl}
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        isBasicMaterial={isBasicMaterial}
      />
    </Suspense>
  );
};

interface PlanetProps {
  planet: CelestialBodyData;
  position: [number, number, number];
  scale: number;
  orbitRadius: number;
  orbitSpeed: number;
  showOrbits: boolean;
  isSelected: boolean;
  isPaused: boolean;
  simulationSpeed: number;
  onSelect: (planet: CelestialBodyData) => void;
}

const Planet = ({ 
  planet, 
  position, 
  scale, 
  orbitRadius, 
  orbitSpeed, 
  showOrbits, 
  isSelected, 
  isPaused,
  simulationSpeed,
  onSelect 
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Line>(null);
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);
  
  // Update position based on orbit
  useFrame((_, delta) => {
    if (meshRef.current && !isPaused) {
      // Update orbit angle
      const newAngle = angle + (orbitSpeed * delta * simulationSpeed * 0.1);
      setAngle(newAngle);
      
      // Calculate new position
      const x = Math.sin(newAngle) * orbitRadius;
      const z = Math.cos(newAngle) * orbitRadius;
      
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;
      
      // Rotate planet
      meshRef.current.rotation.y += delta * simulationSpeed * 0.5;
    }
  });
  
  // Create orbit path
  const orbitPoints = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    orbitPoints.push(
      new Vector3(Math.sin(theta) * orbitRadius, 0, Math.cos(theta) * orbitRadius)
    );
  }
  
  // Update orbit line geometry
  useEffect(() => {
    if (orbitRef.current && showOrbits) {
      const geometry = orbitRef.current.geometry;
      geometry.setFromPoints(orbitPoints);
    }
  }, [orbitPoints, showOrbits]);
  
  return (
    <>
      {/* Orbit line */}
      {showOrbits && (
        <line ref={orbitRef}>
          <bufferGeometry attach="geometry" />
          <lineBasicMaterial 
            attach="material" 
            color={isSelected ? "#ffffff" : "#666666"} 
            opacity={isSelected ? 0.8 : 0.3} 
            transparent 
          />
        </line>
      )}
      
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={position}
        scale={[scale, scale, scale]}
        onClick={() => onSelect(planet)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MaterialWithFallback 
          textureUrl={planet.texture} 
          color={planet.color}
          emissive={hovered || isSelected ? planet.color : undefined}
          emissiveIntensity={hovered ? 0.5 : isSelected ? 0.3 : 0}
        />
      </mesh>
      
      {/* Planet label */}
      {(hovered || isSelected) && (
        <DreiHtml position={[meshRef.current?.position.x || 0, (meshRef.current?.position.y || 0) + scale * 1.5, meshRef.current?.position.z || 0]}>
          <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
            {planet.name}
          </div>
        </DreiHtml>
      )}
    </>
  );
};

// Sun component with glow effect
const Sun = ({ scale }: { scale: number }) => {
  const sunData = solarSystemData.find(body => body.id === 'sun')!;
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });
  
  return (
    <group>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[scale * 1.2, 32, 32]} />
        <meshBasicMaterial color={sunData.color} transparent opacity={0.1} />
      </mesh>
      
      {/* Sun surface */}
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MaterialWithFallback 
          textureUrl={sunData.texture} 
          color={sunData.color}
          emissive={sunData.color}
          emissiveIntensity={1}
          isBasicMaterial={true}
        />
      </mesh>
    </group>
  );
};

interface SolarSystem3DProps {
  showOrbits: boolean;
  isRealisticScale: boolean;
  selectedPlanet: string | null;
  isPaused: boolean;
  simulationSpeed: number;
  onSelectPlanet: (planet: CelestialBodyData) => void;
}

const SolarSystem3D = ({ 
  showOrbits, 
  isRealisticScale, 
  selectedPlanet,
  isPaused,
  simulationSpeed,
  onSelectPlanet 
}: SolarSystem3DProps) => {
  const controlsRef = useRef<any>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
  // Scale factors
  const baseScale = isRealisticScale ? 0.00001 : 1;
  const sunScale = 0.5;
  const distanceScale = isRealisticScale ? 1 : 0.3;
  
  // Focus on selected planet
  useEffect(() => {
    if (selectedPlanet && controlsRef.current) {
      const planet = solarSystemData.find(p => p.id === selectedPlanet);
      if (planet && planet.id !== 'sun') {
        // Calculate position based on orbit
        const orbitRadius = (planet.distanceFromSun || 0) * distanceScale * 0.01;
        controlsRef.current.target.set(0, 0, 0);
        // Animate to new position
        setTimeout(() => {
          controlsRef.current.target.set(orbitRadius, 0, 0);
        }, 100);
      } else {
        // Focus on sun
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  }, [selectedPlanet, distanceScale]);
  
  // Set canvas as ready after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCanvasReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }} onCreated={() => setIsCanvasReady(true)}>
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
          
          {/* Background stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Sun */}
          <Sun scale={sunScale} />
          
          {/* Planets */}
          {solarSystemData
            .filter(body => body.type !== 'star')
            .map((planet) => {
              const planetScale = (planet.diameter / 12756) * 0.1 * baseScale; // Earth = 0.1
              const orbitRadius = (planet.distanceFromSun || 0) * distanceScale * 0.01;
              const orbitSpeed = 1 / (planet.orbitalPeriod || 365);
              
              return (
                <Planet
                  key={planet.id}
                  planet={planet}
                  position={[orbitRadius, 0, 0]}
                  scale={planetScale}
                  orbitRadius={orbitRadius}
                  orbitSpeed={orbitSpeed}
                  showOrbits={showOrbits}
                  isSelected={selectedPlanet === planet.id}
                  isPaused={isPaused}
                  simulationSpeed={simulationSpeed}
                  onSelect={onSelectPlanet}
                />
              );
            })}
          
          {/* Controls */}
          <OrbitControls 
            ref={controlsRef} 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
      
      {/* Fallback message if canvas fails to load */}
      {!isCanvasReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-bold mb-2">Loading Solar System...</h3>
            <p>If nothing appears, please check your browser compatibility with WebGL.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarSystem3D;