import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomeScreen } from './home-screen.tsx';

describe('HomeScreen', () => {
  it('renders hero headline', () => {
    render(
      <MemoryRouter>
        <HomeScreen />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Build trust-first marketplaces with Forumo'),
    ).toBeInTheDocument();
  });
});
