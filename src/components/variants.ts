import { x } from "framer-motion/dist/types.d-B50aGbjN"

export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      opacity:0,
      y:direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === "left" ? 40 : direction === 'right' ? -40 : 0,
    },
    show:{
      y:0,
      x:0,
      opacity:1,
      transition:{
        type:'spring',
        bounce:.5,
        duration:.7,
        delay: delay,
        ease:[0.25,0.25,0.25,0.5]
      }
    }
  }
}
