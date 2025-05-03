import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import { animated, useSpring } from '@react-spring/three'

function SimpleIphoneModel({ steps, currentStep }) {
  const { scene } = useGLTF('/models/iphone/scene.gltf')
  const textures = [
    useTexture('/models/iphone/textures/foto1.png'),
    useTexture('/models/iphone/textures/foto2.png'),
    useTexture('/models/iphone/textures/foto3.png'),
    useTexture('/models/iphone/textures/foto4.png'),
    useTexture('/models/iphone/textures/foto5.png'),
    useTexture('/models/iphone/textures/foto6.png'),
  ]

  const { position, scale, rotation } = useSpring({
    position: steps[currentStep].position,
    scale: Array(3).fill(steps[currentStep].scale),
    rotation: steps[currentStep].rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  useEffect(() => {
    const emissiveTexture = currentStep % 4 === 0 ? textures[1] : textures[0]
    emissiveTexture.flipY = false

    console.log(`Cambiando a la textura: ${emissiveTexture.image.src}`)

    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) {
          child.material.map.dispose()
        }
        child.material.map = emissiveTexture
        child.material.needsUpdate = true
      }
    })
  }, [scene, textures, currentStep])

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
    { position: [-0.1, -3, 0], scale: 40, rotation: [0, MathUtils.degToRad(180), 0] },
    { position: [5, -3, 0], scale: 40, rotation: [0, MathUtils.degToRad(90), 0] },
    { position: [0, -3, 0], scale: 40, rotation: [0, MathUtils.degToRad(-180), 0] },
    { position: [-0.2, -0.35, 0], scale: 40, rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-100), MathUtils.degToRad(-45)] },
    { position: [-1.2, -0.6, 0], scale: 40, rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] },
    { position: [-1.6, -0.6, 0], scale: 40, rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] },
  ]

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = rect.bottom - rect.top

        if (rect.top < window.innerHeight - sectionHeight / 2 && rect.bottom >= sectionHeight / 2) {
          setCurrentStep(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SimpleIphoneModel steps={steps} currentStep={currentStep} />
    </Canvas>
  )
}
