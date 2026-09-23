import { motion, useReducedMotion } from 'framer-motion'

type ShinyTextProps = {
  text: string
  className?: string
  color?: string
  shineColor?: string
  speed?: number
  spread?: number
  paused?: boolean
}

export default function ShinyText({
  text,
  className = '',
  color = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
  spread = 100,
  paused = false,
}: ShinyTextProps) {
  const reducedMotion = useReducedMotion()
  const isStatic = reducedMotion || paused || speed <= 0

  return (
    <motion.span
      className={`shiny-text ${className}`}
      initial={false}
      animate={{ backgroundPosition: isStatic ? '100% 50%' : ['100% 50%', '0% 50%'] }}
      transition={isStatic ? { duration: 0 } : { duration: speed, repeat: Infinity, ease: 'linear' }}
      style={{
        // A 200%-wide image moves right as its position goes from 100% to 0%.
        backgroundImage: `linear-gradient(${spread}deg, ${color} 35%, ${shineColor} 50%, ${color} 65%)`,
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
    </motion.span>
  )
}
