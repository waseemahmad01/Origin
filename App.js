import React from 'react';
import {API_URL} from '@env';

import store from './store';
import {Provider} from 'react-redux';
import StackNavigator from './navigators/StackNavigator';

const App = () => {
  console.log(API_URL);
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
