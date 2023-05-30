const getNextFundingAt = (value: any) => {
    let mins: number;
    let secs: number;
    const getTime = new Date().getTime() - new Date(value).getTime()
    let counter = (getTime - (getTime % 1000)) / 1000
    secs = Math.abs(counter % 60)
    mins = Math.floor(Math.abs(counter / 60))
    let countdownInterval = setInterval(getNextFundingAt, 1000)
    if (counter <= 0) {
        clearInterval(countdownInterval);
    }
    return { mins, secs }
}

export default getNextFundingAt
