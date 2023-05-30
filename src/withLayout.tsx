import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

export function withLayout<P extends object>(
    LayoutComponent: React.ComponentType<LayoutProps>,
    Component: React.ComponentType<P>
): React.ComponentType<P> {
    return function WrappedComponent(props: P) {
        return (
            <LayoutComponent>
                <Component {...props} />
            </LayoutComponent>
        );
    };
}