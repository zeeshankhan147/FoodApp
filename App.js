import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';


import Route from './components/Navigation/Route';
import Store from './components/Redux/Store';

function App() {

  return ( 
  <Provider store={Store}>
    <Route/>
  </Provider>
  );
}

export default App; 