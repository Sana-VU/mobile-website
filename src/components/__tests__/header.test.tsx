import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Header } from '../layout/header';

describe('Header', () => {
  it('renders the header with site name', () => {
    render(<Header />);
    expect(screen.getByText('WhatMobile')).toBeInTheDocument();
  });
});