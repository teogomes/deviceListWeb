import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeviceCard from '../Screens/Components/DeviceCard';

test('renders content', () => {
  const device = {
    owner: 'me',
    model: 'myPhone',
    os: 'ios',
    notes: 'test',
  };

  render(<DeviceCard device={device} />);

  const element = screen.getByText('myPhone');
  const deviceModel = screen.getByTestId('model');

  expect(deviceModel).toHaveTextContent(`Model: ${device.model}`);
  expect(element).toBeDefined();
});

test('clicking the card navigates to next screen', () => {
  const device = {
    owner: 'me',
    model: 'myPhone',
    os: 'ios',
    notes: 'test',
  };

  const mockHandler = jest.fn();
  render(<DeviceCard device={device} onClick={mockHandler} />);

  const card = screen.getByTestId('deviceCard');
  userEvent.click(card);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
