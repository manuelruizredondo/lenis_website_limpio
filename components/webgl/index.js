import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import { animated, useSpring } from '@react-spring/three'

function SimpleIphoneModel({ steps, currentStep }) {
  const { scene } = useGLTF('/models/iphone/scene.gltf')
  const texture = useTexture('/images/foto.png')

  // Configuramos el spring para posición, escala y rotación
  const { position, scale, rotation } = useSpring({
    position: steps[currentStep].position,
    scale: Array(3).fill(steps[currentStep].scale),
    rotation: steps[currentStep].rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  useEffect(() => {
    // Con GLTFLoader las UVs vienen volteadas: ajustamos
    texture.flipY = false

    // Cambiamos la textura del material_1 a la foto
    scene.traverse((child) => {
      if (child.isMesh && child.material.name === 'material_1') {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })
  }, [scene, texture])

  return (
    <animated.primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  )
}

export default function SimpleIphoneDisplay() {
  const steps = [
    { position: [-0.1, -1.75, 0],    scale: 0.05,
      rotation: [
        MathUtils.degToRad(0),
        MathUtils.degToRad(45),
        MathUtils.degToRad(0),
      ],

     },
    {
      position: [5, -1.75, 0],
      scale: 0.05,
      rotation: [
        MathUtils.degToRad(-0),
        MathUtils.degToRad(150),
        MathUtils.degToRad(-0),
      ],
    },
    {
      position: [5, -1.75, 0],
      scale: 1.6,
      rotation: [
        MathUtils.degToRad(0),
        MathUtils.degToRad(-180),
        MathUtils.degToRad(0),
      ],
    },
    {
      position: [-0.2, -0.35, 0],
      scale: 0.5,
      rotation: [
        MathUtils.degToRad(-90),
        MathUtils.degToRad(-100),
        MathUtils.degToRad(-45),
      ],
    },
    {
      position: [-1.2, -0.6, 0],
      scale: 0.05,
      rotation: [
        MathUtils.degToRad(-90),
        MathUtils.degToRad(-405),
        MathUtils.degToRad(-45),
      ],
    },
    {
      position: [-1.6, -0.6, 0],
      scale: 0.05,
      rotation: [
        MathUtils.degToRad(-90),
        MathUtils.degToRad(-405),
        MathUtils.degToRad(-45),
      ],
    },
  ]

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = rect.bottom - rect.top

        if (
          rect.top < window.innerHeight - sectionHeight / 2 &&
          rect.bottom >= sectionHeight / 2
        ) {
          setCurrentStep(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov:50, near: 0.1, far: 100 }}
    >
      <ambientLight intensity={10} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

 
      <SimpleIphoneModel steps={steps} currentStep={currentStep} />
    </Canvas>
  )
}
