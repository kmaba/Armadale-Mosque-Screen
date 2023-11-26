import React from 'react';
import ReactDOM from 'react-dom';
import View7 from './View7';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<View7 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
