import React from 'react';
import ReactDOM from 'react-dom';
import View6Timer from './View6Timer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<View6Timer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
