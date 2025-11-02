import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HomeScreen } from './home-screen.tsx';

describe('HomeScreen', () => {
  it('renders hero headline', () => {
    const markup = renderToString(
      <StaticRouter location="/">
        <HomeScreen />
      </StaticRouter>,
    );

    expect(markup).toContain('Build trust-first marketplaces with Forumo');
  });
});
