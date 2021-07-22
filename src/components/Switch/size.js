const SizeMap = {
    sm: { width: 26, height: 10, padding: 7, thumb: 16, halo: 24 },
    md: { width: 34, height: 14, padding: 12, thumb: 20, halo: 38 },
    lg: { width: 42, height: 18, padding: 15, thumb: 24, halo: 52 },
};

function getSize(size, type) {
    const sizeSet = SizeMap[size] || SizeMap["md"];
    return sizeSet[type]
}
export { getSize }