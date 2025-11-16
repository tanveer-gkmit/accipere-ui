import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../app';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Open Positions/i, level: 1 })).toBeInTheDocument();
  });
});
