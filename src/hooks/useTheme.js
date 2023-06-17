import { useEffect } from 'react'
import { useSettings } from '../context'
import { THEME_COLORS } from '../constants'

const useTheme = () => {
    const { theme } = useSettings()

    useEffect(() => {
        const root = document.querySelector('body')

        root.style.backgroundColor = THEME_COLORS[theme].rootBackground
    }, [theme])

    return THEME_COLORS[theme]
}

export { useTheme }
