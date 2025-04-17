import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Outlet } from 'react-router'

export default function Scene() {
    return (
        <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
             <ambientLight intensity={Math.PI / 2} />
             <directionalLight position={[10, 10, 5]} />
            <Outlet />
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
        </Canvas>
    )
}