import { darken, lighten } from '../utils/tools'
const THEME_OPTIONS = {
    light: 'LIGHT',
    dark: 'DARK',
}

const THEME_COLORS = {
    light: {
        bg: 'bg-light',
        color: 'black',
        navbar: 'navbar-light',
        textColor: 'text-dark',
        bgColor: '#fff',
        bgColorNotWide: '#fff',
        tableColor: '',
        btnSecondary: 'btn-outline-dark',
        btnFlipCurrency: 'btn-outline-secondary',
        rootBackground: '#fff',
        alertSuccess: 'alert-success',
    },
    dark: {
        bg: 'bg-dark',
        color: 'white',
        textColor: 'text-light',
        navbar: 'navbar-dark',
        bgColor: '#000',
        bgColorNotWide: '#212529',
        tableColor: 'table-dark',
        btnSecondary: 'btn-outline-light',
        btnFlipCurrency: 'btn-light',
        rootBackground: '#212529',
        alertSuccess: 'alert-warning',
    },
}

const BASE_COLORS = {
    'bs-blue': '#0d6efd',
    'bs-indigo': '#6610f2',
    'bs-purple': '#6f42c1',
    'bs-pink': '#d63384',
    'bs-red': '#dc3545',
    'bs-orange': '#fd7e14',
    'bs-yellow': '#ffc107',
    'bs-green': '#198754',
    'bs-teal': '#20c997',
    'bs-cyan': '#0dcaf0',
    'bs-secondary': '#6c757d',
}

let COLORS = {
    ...BASE_COLORS,
}
const shades = [80, 60, 40, 20, 20, 40, 60, 80]
shades.forEach((shade, index) => {
    Object.keys(BASE_COLORS).forEach(key => {
        const baseColorName = key.slice(3)
        if (index <= 3) {
            COLORS[`${baseColorName}-${(index + 1) * 100}`] = lighten(
                BASE_COLORS[key],
                shade
            )
        }
        if (index === 4) {
            COLORS[`${baseColorName}-${(index + 1) * 100}`] = BASE_COLORS[key]
        }
        if (index >= 5) {
            COLORS[`${baseColorName}-${(index + 2) * 100}`] = darken(
                BASE_COLORS[key],
                shade
            )
        }
    })
})

export { THEME_COLORS, COLORS }
export default THEME_OPTIONS
