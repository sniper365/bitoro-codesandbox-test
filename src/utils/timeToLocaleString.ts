export function timeToLocaleString(value: string) {
    return new Date(value).toLocaleString([], { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
}

export function timeToLocaleTimeString(value: string) {
    return new Date(value).toLocaleTimeString([], { hour12: false })
}

