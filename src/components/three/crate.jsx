import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Crate({
    size = 2,        // outside width/height/depth in world units
    wall = 0.12,     // thickness of each wall
    color = 'orange' // temporary solid colour
  }) {
    const half = size / 2
    const tHalf = wall / 2
  
    return (
      <group>
        {/* bottom */}
        <mesh position={[0, -half + tHalf, 0]}>
          <boxGeometry args={[size, wall, size]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
  
        {/* front */}
        <mesh position={[0, 0,  half - tHalf]}>
          <boxGeometry args={[size, size, wall]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
  
        {/* back */}
        <mesh position={[0, 0, -half + tHalf]}>
          <boxGeometry args={[size, size, wall]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
  
        {/* left */}
        <mesh position={[-half + tHalf, 0, 0]}>
          <boxGeometry args={[wall, size, size]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
  
        {/* right */}
        <mesh position={[ half - tHalf, 0, 0]}>
          <boxGeometry args={[wall, size, size]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )
  }