import * as React from 'react';
import { LoginNavigator } from './src/shared/routes/LoginNavigation';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    < >
      <LoginNavigator/>
      <Toast />
    </>
  );
}