import { useEffect, useState, useRef } from "react";

export function useNearScreen() {
  // useRef se usa para obtener la refencia de un elemento del don
  const element = useRef(null);
  const [show, setShow] = useState(false);
  // este userEffect es el encargado de renderizar SOLO las card que esta en pantalla y no todas la vez
  useEffect(
    function() {
      // no todos los navegadores tiene soporte a IntersectionObserver por lo que se hace un import dinamico
      // se envielve todo en una promesa para poder enlazarlo al then siguiente
      Promise.resolve(
        typeof window.IntersectionObserver !== "undefined"
          ? window.IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        const observer = new window.IntersectionObserver(function(entries) {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });
        observer.observe(element.current);
      });
    },
    [element]
  );

  return [show, element];
}
