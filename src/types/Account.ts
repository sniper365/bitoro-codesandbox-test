type Account = {
    accountNumber: string,
    createdAt: string,
    id: string,
    positionId: string,
    equity: string,
    freeCollateral: string,
    pendingDeposits: string,
    pendingWithdrawals: string,
    quoteBalance: string,
    starkKey: string,
    openPositions: {
        [key: string]: Position
    }
}

interface Position {
    closedAt: any,
    createdAt: string,
    entryPrice: string,
    exitPrice: string,
    market: string,
    maxSize: string,
    netFunding: string,
    realizedPnl: string,
    side: string,
    size: string,
    status: string,
    sumClose: string,
    sumOpen: string,
    unrealizedPnl: string
}

export default Account