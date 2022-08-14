import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';


import Route from './components/Navigation/Route';
import Store from './components/Redux/Store';
import SplashScreen from './components/SplashScreen';

function App() {
  const [initialRoutes, setInitialRoutes] = useState(false)

  useEffect(()=>{
    setTimeout(() => {
      setInitialRoutes(true)
    }, 1000);
    
  },[])

  return ( 
  <Provider store={Store}>
    {initialRoutes ? <Route/> : <SplashScreen/>}
  </Provider>
  );
}

export default App; 