export function errorHandling(error) {
    let message = ''

    if(JSON.stringify(error).includes("transfer amount exceeds balance")) {
        message = "Insufficient Balance"
    }

    if(JSON.stringify(error).includes("insufficient funds")) {
        message = "Insufficient Balance"
    }
    return message
}