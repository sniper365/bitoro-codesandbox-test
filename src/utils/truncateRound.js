export function fancyNumber(value) {
    let fancy;

    if (parseFloat(value) > 0) {
        fancy = value.match(/^-?\d+(?:\.\d{0,3})?/)[0]
    } else {
        fancy = parseFloat(value).toFixed(3)
    }
    return fancy
}