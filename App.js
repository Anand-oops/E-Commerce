import React from 'react';
import { LogBox } from 'react-native';
import Providers from './navigation/Index';

LogBox.ignoreAllLogs();

const App = () => {
  return <Providers />;
}

export default App;
