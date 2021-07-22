import { parseColor } from "../common/utils"
const ColorThemeMap = {
    primary: {
        track: [0, 0, 0, 1],
        trackCheckd: [25, 118, 210, 1],
        thumb: [255, 255, 255, 1],
        thumbChecked: [25, 118, 210, 1],
        thumbDisabled: [167, 202, 237, 1], //when checked but disabled
        halo: [0, 0, 0, 0.04], // when hovering
        haloChecked: [25, 118, 210, 0.04],
        ripple: [25, 118, 210, 0.3],
        rippleChecked: [255, 255, 255, 0.3],
        label: [0, 0, 0, 0.87],
    },
    secondary: {
        track: [0, 0, 0, 1],
        trackCheckd: [156, 39, 176, 1],
        thumb: [255, 255, 255, 1],
        thumbChecked: [156, 39, 176, 1],
        thumbDisabled: [217, 172, 224, 1], //when checked but disabled
        halo: [0, 0, 0, 0.04], // when hovering
        haloChecked: [156, 39, 176, 0.04],
        ripple: [156, 39, 176, 0.3],
        rippleChecked: [255, 255, 255, 0.3],
        label: [0, 0, 0, 0.87],
    },
    disabled: {
        track: [0, 0, 0, 1],
        trackCheckd: [25, 118, 210, 1], //it doesn't matter
        thumb: [245, 245, 245, 1],
        thumbChecked: [25, 118, 210, 1], //it doesn't matter
        thumbDisabled: [167, 202, 237, 1], //it doesn't matter
        halo: [0, 0, 0, 0.04], //it doesn't matter
        haloChecked: [25, 118, 210, 0.04], //it doesn't matter
        ripple: [25, 118, 210, 0.3], //it doesn't matter
        rippleChecked: [255, 255, 255, 0.3], //it doesn't matter
        label: [0, 0, 0, 0.38],
    },

}

function getColor(theme, type) {
    const colorThemeSet = ColorThemeMap[theme] || ColorThemeMap["primary"];
    let rgba = colorThemeSet[type];
    if (!rgba)
        throw Error(
            `Not Found the ${type}-color of ${theme}`
        );
    return parseColor(rgba);
}

export { getColor }