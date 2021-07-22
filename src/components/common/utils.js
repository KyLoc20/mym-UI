function parseColor(inputColorArray, alpha) {
    let arr = [...inputColorArray];
    if (alpha) arr[3] = alpha;
    return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
}
export { parseColor }