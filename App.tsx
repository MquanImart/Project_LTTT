// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/shared/routes/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
