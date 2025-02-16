import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

const rootElem = document.getElementById('root');

if (rootElem) {
  createRoot(rootElem).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
