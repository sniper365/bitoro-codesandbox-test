
const isDivisableByTickSize = (input: string, tickSize: string) => {
    const multiple = Math.abs(Math.log10(parseFloat(tickSize)))
    return Number.isInteger((parseFloat(input) * 10 ** multiple) / (parseFloat(tickSize) * 10 ** multiple))
}

export default isDivisableByTickSize