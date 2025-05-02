// src/components/ScrollPage.jsx

import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import Lenis from 'lenis'
import * as THREE from 'three'
import { MathUtils } from 'three'

// 1️⃣ Tu array de pasos
const steps = [
  { position: [-0.1, -1.75, 0], scale: 0.10, rotation: [0, Math.PI * 0.5, 0] },
  { position: [0.15, -0.4, 0],   scale: 0.02,  rotation: [MathUtils.degToRad(-45), MathUtils.degToRad(-135), MathUtils.degToRad(-45)] },
  { position: [0.15, -0.4, 0],   scale: 0.02,  rotation: [MathUtils.degToRad(45),  MathUtils.degToRad(-315), MathUtils.degToRad(-45)] },
  { position: [-0.2, -0.35, 0],  scale: 0.02,  rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] },
  { position: [-1.2, -0.6, 0],   scale: 0.05,  rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] },
  { position: [-1.6, -0.6, 0],   scale: 0.05,  rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] },
  { position: [0.16, -1.38, 0],  scale: 0.05,  rotation: [0, MathUtils.degToRad(200), MathUtils.degToRad(-16)] },
  { position: [0, -0.68, 0],     scale: 0.04,  rotation: [0, MathUtils.degToRad(-14), MathUtils.degToRad(-16)] },
  { position: [-0.22, -0.61, 0],  scale: 0.03,  rotation: [0, MathUtils.degToRad(-517), MathUtils.degToRad(-16)] },
  { position: [0.2, -0.46, 0],    scale: 0.03,  rotation: [0, MathUtils.degToRad(-700), MathUtils.degToRad(-16)] },
]

// 2️⃣ ScrollModel ya no calcula sección, recibe el índice directamente
function ScrollModel({ stepIndex }) {
  const group = useRef()

  useFrame((_, delta) => {
    if (!group.current) return
    const { position, rotation, scale } = steps[stepIndex]

    const speed = 5 * delta
    group.current.position.lerp(new THREE.Vector3(...position), speed)
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), speed)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rotation[0], speed)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation[1], speed)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, rotation[2], speed)
  })

  const { scene } = useGLTF('/models/arm.glb')
  return <primitive ref={group} object={scene} />
}

// 3️⃣ Componente principal que detecta cada <section>
export default function ScrollPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [sectionTops, setSectionTops] = useState([])

  // al montar, recogemos la posición de cada <section> en la página
  useEffect(() => {
    setMounted(true)
    const els = Array.from(document.querySelectorAll('section'))
    setSectionTops(els.map(el => el.offsetTop))
  }, [])

  // Lenis para el scroll suave
  useEffect(() => {
    if (!mounted) return
    const lenis = new Lenis({ smooth: true })
    lenis.on('scroll', ({ scroll }) => setScrollY(scroll))
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [mounted])

  if (!mounted || sectionTops.length === 0) return null

  // calculamos el índice de sección activa según scrollY
  let idx = sectionTops.findIndex((top, i) => {
    const nextTop = sectionTops[i + 1] ?? Infinity
    return scrollY >= top && scrollY < nextTop
  })
  if (idx === -1) idx = 0                  // si no encuentra, usa 0
  const stepIndex = Math.min(idx, steps.length - 1)


  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Suspense fallback={null}>
        {/* le pasamos el índice calculado */}
        <ScrollModel stepIndex={stepIndex} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Suspense>
    </Canvas>
  )
}
