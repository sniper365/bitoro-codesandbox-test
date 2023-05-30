export const bitoroClientURL = () => {
    const url = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://bitoro.exchange'
    return url
}

export const bitoroAppClientURL = () => {
    const url = 'https://app.bitoro.exchange'
    return url
}

export const bitoroServerURL = () => {
    const url = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : 'https://bitoro.exchange'
    return url
}

export const bitoroAdmin = () => {
    const address = '0x08d6e63afeff14f14e9b4c61539a897f5ff54a34'
    return address
}
