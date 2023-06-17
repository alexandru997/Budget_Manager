import { COLORS } from '../constants'
const noop = () => {}
const mix = (color_1, color_2, weight = 50) => {
    color_1 = color_1.replace('#', '')
    color_2 = color_2.replace('#', '')
    const d2h = d => d.toString(16) // convert a decimal value to hex
    const h2d = h => parseInt(h, 16) // convert a hex value to decimal

    let color = '#'

    for (let i = 0; i <= 5; i += 2) {
        // loop through each of the 3 hex pairs—red, green, and blue
        let v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
            v2 = h2d(color_2.substr(i, 2)),
            // combine the current pairs from each source color, according to the specified weight
            val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)))

        while (val.length < 2) {
            val = '0' + val
        } // prepend a '0' if val results in a single digit

        color += val // concatenate val to our new color string
    }

    return color // PROFIT!
}

const darken = (color, weight = 50) => mix('#000000', color, weight)
const lighten = (color, weight = 50) => mix('#ffffff', color, weight)

const getNotSoRandomColor = i => {
    const _COLORS = Object.values(COLORS)
    return _COLORS[Math.ceil(i % _COLORS.length)]
}
const getRandomColor = (i, length) => {
    if (length === 0) {
        length = 1
    }
    const hue = Math.floor(Math.abs(i / length) * 360) // between 0 and 340
    let saturation = 90,
        lightness = 50

    // color adjustment:
    // if (hue > 215 && hue < 265) {
    //     const gain = 20
    //     let blueness = 1 - Math.abs(hue - 240) / 25,
    //         change = Math.floor(gain * blueness)
    //     lightness += change
    //     saturation -= change
    // }
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}
export {
    noop,
    mix,
    lighten,
    darken,
    getRandomColor,
    getNotSoRandomColor,
    isMobileDevice,
}
