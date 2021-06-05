function requireOneOf(arr) {
    return (candidate) => {
        // console.log('requireOneOf', )
        if (arr.indexOf(candidate) > -1) return true
        else return false
    }
}

function requirePositiveNumber() {
    return (candidate) => {
        // console.log('requirePositiveNumber', )
        if (typeof candidate === "number" && candidate > 0) return true
        else return false
    }

}

function requireAuto() {
    //demanded when users wanna customize the style in the outer css
    return (candidate) => {
        if (candidate === "auto") return true
        else return false
    }

}
export {
    requireAuto,
    requireOneOf,
    requirePositiveNumber,
}