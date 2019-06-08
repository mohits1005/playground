import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Clickers from './Clickers';

afterEach(cleanup);

it('displays the count', () => {
    const {getByTestId} = render(<Clickers />);
    expect(getByTestId('count')).toHaveTextContent("0");
})

it('increment count', () => {
    const { getByTestId, getByText } = render(<Clickers />);
    fireEvent.click(getByText('Up'));
    expect(getByTestId('count')).toHaveTextContent('1');
})

it('decrement count delayed', async () => {
    const { getByTestId, getByText } = render(<Clickers />);
    fireEvent.click(getByText('Down'));
    const countSpan = await waitForElement(() => getByText('-1'))
    expect(countSpan).toHaveTextContent('-1');
    // expect(getByTestId('count')).toHaveTextContent('-1');
});