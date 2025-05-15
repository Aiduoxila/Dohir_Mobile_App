import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const LoginScreen = () => null;
const HomeScreen = () => null;
const InventoryScreen = () => null;
const SalesScreen = () => null;
const AccountingScreen = () => null;

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Sales" component={SalesScreen} />
          <Stack.Screen name="Accounting" component={AccountingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}