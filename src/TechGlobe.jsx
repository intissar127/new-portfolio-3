import React, { useRef } from 'react'; // <--- AJOUTER CECI
import { useFrame } from '@react-three/fiber'; // <--- AJOUTER CECI AUSSI
import { Sphere } from '@react-three/drei';

export default function TechGlobe() {
  const mesh = useRef(); // Maintenant, useRef est bien défini !

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.1;
      mesh.current.rotation.x = t * 0.05;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.7, 32, 32]} />
      <meshStandardMaterial 
        color="#2d5c68" 
        wireframe 
         
        opacity={0.6} 
      />
      
      <Sphere args={[0.3, 50, 50]}>
        <meshBasicMaterial color="#3edcf8" />
      </Sphere>
    </mesh>
  );
}