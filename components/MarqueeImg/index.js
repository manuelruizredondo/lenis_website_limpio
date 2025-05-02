import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export function MarqueeImg({ children }) {
  const el = useRef(null)

  useEffect(() => {
    const element = el.current;
    const childCount = element.children.length;
    const childWidth = element.children[0]?.offsetWidth || 0;
    const totalWidth = childCount * childWidth;

    const animation = gsap.fromTo(element, 
      { x: '0%' }, // Inicia alineado a la izquierda
      {
        x: `-${totalWidth - window.innerWidth}px`, // Se mueve hacia la izquierda hasta que el último elemento esté alineado a la derecha
        scrollTrigger: {
          trigger: element,
          start: 'top 100%', // Empieza cuando el elemento entra completamente en pantalla
          end: 'bottom top', // Termina cuando el elemento sale de pantalla
          scrub: true, // Sincroniza la animación con el scroll
          onUpdate: (self) => {
            if (self.progress === 1) {
              gsap.set(element, { x: `-${totalWidth - window.innerWidth}px` }); // Alinea el último elemento a la derecha al terminar
            }
          }
        }
      }
    );

    return () => {
      animation.kill(); // Limpia la animación al desmontar el componente
      ScrollTrigger.getAll().forEach(st => st.kill()); // Asegura que todos los ScrollTriggers se limpien
    }
  }, [])

  return (
    <div ref={el} >
      {children}
    </div>
  )
}