const timeUtilizerFromHours = (value: string, label: string) => {
    if (label === 'm') {
        return parseFloat(value) * 60 * 1000
    }
    if (label === 'h') {
        return parseFloat(value) * 60 * 60 * 1000
    }
    if (label === 'd') {
        return parseFloat(value) * 60 * 60 * 24 * 1000
    }
    return parseFloat(value) * 60 * 60 * 24 * 7 * 1000
}

export default timeUtilizerFromHours
