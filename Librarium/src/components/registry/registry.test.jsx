import React from 'react';
import ReactDOM from 'react-dom';
import Registry from './registry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Registry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
