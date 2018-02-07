import * as React from 'react';
import {hydrate, render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Loadable from 'react-loadable';

import App from '../app';

(window as any).__main__ = () => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <AppContainer>
        <App />
      </AppContainer>,
      document.querySelector('#app'),
    );
  });
};

if (module.hot) {
  module.hot.accept('./index.tsx');

  const renderNewApp = () => {
    const NewApp = require('../app/index.tsx').default;
    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      document.querySelector('#app'),
    );
  };

  module.hot.accept('../app/index.tsx', renderNewApp);
}
