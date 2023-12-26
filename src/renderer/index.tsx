import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n';
import { store } from '@app/store/store';
import App from './App';
import '@app/styles/scss/utils/utils.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
