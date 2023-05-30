import { configureStore } from '@reduxjs/toolkit';
import appMarketReducer from './appMarket';
import appMarketsReducer from './appMarkets';
import appCollateralReducer from './appCollateral'
import appOrderReducer from './appOrder';
import appPositionReducer from './appPosition';
import appOrdersReducer from './appOrders';
import appPositionsReducer from './appPositions';
import appMarketRealtimePriceReducer from './appMarketRealtimePrice'
import appMarketNameFromRouteReducer from './appMarketNameFromRoute'
import appMarketLoadingReducer from './appMarketLoading'
import appMarketTVPriceReducer from './appMarketTVPrice'
import appOrderbookReducer from './appOrderbook';
import appBitoroFeeReducer from './appBitoroFee';
import appBitoroUserStatusReducer from './appBitoroUserStatus';

export const store = configureStore({
  reducer: {
    appMarketReducer,
    appMarketsReducer,
    appCollateralReducer,
    appOrderReducer,
    appPositionReducer,
    appOrdersReducer,
    appPositionsReducer,
    appMarketRealtimePriceReducer,
    appMarketNameFromRouteReducer,
    appMarketLoadingReducer,
    appMarketTVPriceReducer,
    appOrderbookReducer,
    appBitoroFeeReducer,
    appBitoroUserStatusReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;