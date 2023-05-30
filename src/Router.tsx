import * as React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useAccount } from 'wagmi';
import RenderLoader from './views/RenderLoader';
import { withLayout } from './withLayout';
import { BitoroHeader } from './components/bitoroHeader';
const Home = lazy(() => import('./views/Home'))

export function Router() {
  const { address } = useAccount()
  return (
    <BrowserRouter>
      <Suspense fallback={RenderLoader()}>
        <Switch>
          <Route exact path="/" component={withLayout(BitoroHeader, Home)}>
            <Redirect to="/trade/ETH-USD" />
          </Route>
          <Route exact path="/trade" component={withLayout(BitoroHeader, Home)}>
            <Redirect to="/trade/ETH-USD" />
          </Route>
          <Route exact path="/trade/:id" component={withLayout(BitoroHeader, Home)} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
