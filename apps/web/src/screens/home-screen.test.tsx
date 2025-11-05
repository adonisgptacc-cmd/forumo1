import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeScreen } from './home-screen.tsx';

describe('HomeScreen', () => {
  it('renders hero headline', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeScreen />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /Build trust-first marketplaces with Forumo/i }),
    ).toBeInTheDocument();
  });
});
