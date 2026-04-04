'use client'

import { cn } from '@/lib/utils/cn'

type GridMode = 2 | 3 | 4

type Props = {
  active: GridMode
  onChange: (mode: GridMode) => void
}

export default function GridToggle({ active, onChange }: Props) {
  const modes: { value: GridMode; icon: string }[] = [
    { value: 2, icon: '⊞' },
    { value: 3, icon: '⊞⊞' },
    { value: 4, icon: '⊞⊞⊞' },
  ]

  return (
    <div className="hidden md:flex gap-2 items-center">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          className={cn(
            'text-[10px] px-1.5 py-0.5 transition-colors duration-300',
            active === mode.value
              ? 'text-dark'
              : 'text-muted hover:text-sub'
          )}
        >
          {mode.icon}
        </button>
      ))}
    </div>
  )
}
