import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

type CountUpProps = {
  value: number
  start: boolean
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({
  value,
  start,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
}: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start) return
    if (reduceMotion) {
      setCurrent(value)
      return
    }
    const controls = animate(0, value, { duration, ease: EASE_OUT_EXPO, onUpdate: setCurrent })
    return () => controls.stop()
  }, [start, value, duration, reduceMotion])

  const final = `${prefix}${value.toFixed(decimals)}${suffix}`

  return (
    <span className={cn('relative inline-block tabular-nums', className)}>
      {/* Invisible final value reserves the width so surrounding text never shifts */}
      <span className="invisible" aria-hidden="true">
        {final}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {prefix}
        {current.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}
