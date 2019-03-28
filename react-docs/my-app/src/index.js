import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextApp from './ContextApp';
import * as serviceWorker from './serviceWorker';

// function tick(){
//     const Element = (
//         <div>
//             <h1>Hello world</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(Element, document.getElementById('root'));
// }
// setInterval(tick, 1000);
ReactDOM.render(<ContextApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
