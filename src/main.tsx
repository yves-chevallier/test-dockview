import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import "./styles/index.scss";
import "./styles/index.css";

import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOMClient.createRoot(rootElement);

    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    console.error('Root element not found');
}
