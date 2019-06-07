import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Header from './Header';

afterEach(cleanup);

it('render', () => {
    const { asFragment } = render(<Header text="Header" />);
    //snapshot test
    expect(asFragment()).toMatchSnapshot();
})

it('inserts text in h1', () => {
    const { getByTestId, getByText } = render(<Header text='Header' />);
    expect(getByTestId('h1tag')).toHaveTextContent('Header');
    expect(getByText('Header')).toHaveClass('fancy-h1');
})
