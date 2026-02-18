'use client'

import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/Theme'

export function ThemeSelector() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className=" hover:bg-secondary hover:text-primary cursor-pointer"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-primary dark:text-white" />
      ) : (
        <Moon className="h-5 w-5 text-primary dark:text-white" />
      )}
    </Button>
  )
}
