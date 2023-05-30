const timeUtilizerToHours = (value: any) => {
    const getTime =  new Date(value).getTime() - new Date().getTime()
    let counter = (getTime - (getTime % 1000)) / 1000
    if (counter > 3600 * 24 * 7) {
        return { time: Math.ceil(Math.abs(counter / (3600 * 24 * 7))), unit: 'w' }
    }
    if (counter > 3600 * 24) {
        return { time: Math.ceil(Math.abs(counter / (3600 * 24))), unit: 'd' }
    }
    if (counter > 3600) {
        return { time: Math.ceil(Math.abs(counter / 3600)), unit: 'h' }
    }
    if (counter > 60) {
        return { time: Math.ceil(Math.abs(counter / 60)), unit: 'm' }
    }
    return { time: Math.abs(counter % 60), unit: 's' }
}

export default timeUtilizerToHours
