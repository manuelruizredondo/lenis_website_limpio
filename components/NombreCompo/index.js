import React, { useRef, useEffect } from 'react'

export function NombreCompo({ children }) {
  const el = useRef(null)

  useEffect(() => {
    // Aquí puedes agregar cualquier lógica de efecto que necesites


    return () => {
      // Aquí puedes limpiar cualquier cosa que necesites al desmontar el componente
    }
  }, [])

  return (
    <div ref={el}>
      {children}
    </div>
  )
}