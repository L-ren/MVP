import React from 'react'
import ReactDOM from 'react-dom'
() => console.log('webpack works');
ReactDOM.render(
  React.createElement('div', null, `Hello React`),
  document.getElementById('root')
)