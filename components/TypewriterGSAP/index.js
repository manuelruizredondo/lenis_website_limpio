import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import s from './typewriter.module.scss'
gsap.registerPlugin(ScrollTrigger, SplitText)

export function TypewriterGSAP({ text }) {
  const el = useRef(null)

  useEffect(() => {
    // 1️⃣ Partimos el texto en chars
    const split = new SplitText(el.current, { type: 'chars' })
    // 2️⃣ Creamos la animación
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.current,       // elemento que observa
        start: 'top 80%',          // cuando el top del elemento llegue al 80% del viewport
        once: true,                // que solo se ejecute una vez
      }
    })
    tl.from(split.chars, {
      duration: 0.6,
      opacity: 0,               // Inicia con opacidad de 0.5
      y: 30,
      ease: 'power2.out',
      stagger: 0.05,              // retardo entre cada carácter
    })
    // 3️⃣ Cleanup al desmontar
    return () => {
      split.revert()              // recupera el DOM original
      tl.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [text])

  return (
    <div>
      <span className={s.typewriter} ref={el} style={{ overflow: 'hidden', display: 'inline-block' }}>
        {text}
      </span>

    </div>
  )
}