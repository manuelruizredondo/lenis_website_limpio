import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from 'react'


function Model() {
  // Ajusta la ruta al archivo .glb según tu estructura de /public o carpeta de assets
  const { scene } = useGLTF('/models/arm.glb')
  
  // Aseguramos que la escena se clona y está correctamente configurada
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])
  
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

export default function WebGL() {
  // Estado para controlar cuándo renderizar el canvas (solo en cliente)
  const [mounted, setMounted] = useState(false)
  
  // Aseguramos que el componente solo se monte en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // No renderizamos nada hasta que estemos en el cliente
  if (!mounted) return null
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* Luces para hacer visible el modelo */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        
        <Suspense fallback={null}>
          <Model />
          {/* Fondo básico */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  )
}