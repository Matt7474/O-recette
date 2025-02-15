import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElem = document.getElementById('root');

if (rootElem) {
  createRoot(rootElem).render(
    <App />,
  );
}
