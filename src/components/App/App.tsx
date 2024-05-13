import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast'

import styles from './app.module.scss'
import "../../fonts/Quicksand/Quicksand-Light.ttf"
import AppHeader from '../AppHeader/AppHeader';
import HeaderButtons from '../HeaderButtons/HeaderButtons';
import ThemeProvider from '../../providers/ThemeProvider'
import Spinner from '../Spinner/Spinner';


function delayForDemo(promise: Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 200);
  }).then(() => promise);
}

const AppContent = lazy(() =>
  delayForDemo(import('../AppContent/AppContent'))
);

function App() {
  return (
    <ThemeProvider>
      <div>
        <AppHeader>ToDo List</AppHeader>
        <div className={styles.app__wrapper}>
          <HeaderButtons />
          <Suspense fallback={<Spinner />}>
            <AppContent />
          </Suspense>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
            marginTop: '70px',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
