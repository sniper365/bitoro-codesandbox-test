export default function renderVolume(originVolume: number) {
    let volume;
    volume = (Math.ceil(originVolume) / 10 ** 6).toFixed(2)
    return volume + 'M'
}