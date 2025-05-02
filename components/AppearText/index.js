import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import s from './appearText.module.scss'

// Registramos el plugin SplitText de GSAP
gsap.registerPlugin(SplitText)

export function AppearText({ text }) {
  // Creamos una referencia para el elemento DOM
  const el = useRef(null)

  useEffect(() => {
    // Dividimos el texto en palabras usando SplitText
    const split = new SplitText(el.current, { type: 'words' })

    // Creamos una línea de tiempo de GSAP para la animación
    const tl = gsap.timeline({ paused: true })
    tl.from(split.words, {
      duration: 0.6, // Duración de la animación
      opacity: 0.2,  // Opacidad inicial
      ease: 'power2.out', // Tipo de easing
      stagger: 0.2, // Retardo entre cada palabra
    })

    // Función que se ejecuta en cada scroll
    const onScroll = () => {
      const section = el.current.closest('section') // Sección más cercana
      const sectionTop = section.offsetTop // Posición superior de la sección
      const sectionHeight = section.offsetHeight // Altura de la sección
      const scrollY = window.scrollY // Posición actual del scroll
      const windowHeight = window.innerHeight // Altura de la ventana

      // Calculamos el porcentaje de scroll dentro de la sección
      const scrollPercent = Math.min(1, Math.max(0, (scrollY + windowHeight - sectionTop) / sectionHeight))
      tl.progress(scrollPercent) // Actualizamos la animación según el scroll
    }

    // Añadimos el evento de scroll
    window.addEventListener('scroll', onScroll)

    // Cleanup al desmontar el componente
    return () => {
      split.revert() // Revertimos el DOM a su estado original
      tl.kill() // Matamos la línea de tiempo de GSAP
      window.removeEventListener('scroll', onScroll) // Quitamos el evento de scroll
    }
  }, [text]) // Dependencia del efecto

  // Renderizamos el componente
  return (
    <div>
      <span className={s.typewriter} ref={el} style={{ overflow: 'hidden', display: 'inline-block' }}>
        {text}
      </span>
    </div>
  )
}