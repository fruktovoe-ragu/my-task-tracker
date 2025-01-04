import React from 'react';
import { block } from 'bem-cn';
import { Provider } from 'react-redux';
import store from './store/store';
import AppContext from './context/AppContext';
import Header from './sections/Header/Header';
import Main from './sections/Main/Main';
import './App.css';

export const statuses = [
  {
      content: 'To do',
      value: 'todo',
  }, {
      content: 'Doing',
      value: 'doing',
  }, {
      content: 'Done',
      value: 'done',
  }
];

const b = block('task-tracker-app');
const App = () => (
  <Provider store={store}>
    <AppContext>
      <div className={b()}>
        <Header />
        <Main />
      </div>
    </AppContext>
  </Provider>
);

export default App;
