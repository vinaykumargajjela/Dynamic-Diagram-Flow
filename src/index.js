import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import React Flow CSS
import 'reactflow/dist/style.css';

// Import your custom App CSS (must come after bootstrap)
import './App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);