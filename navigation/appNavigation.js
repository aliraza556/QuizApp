import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen.component';
import HomeScreen from '../screens/HomeScreen/HomeScreen.component';
import LoginScreen from '../screens/LoginScreen/LoginScreen.component';
import SignupScreen from '../screens/SignupScreen/SignupScreen.component';
import { StatusBar } from 'react-native';
import {COLORS} from '../constants/theme'

const Stack = createNativeStackNavigator();

export default function AppNavigation () {
  return (
    <NavigationContainer>
    <StatusBar  barStyle="light-content" backgroundColor={COLORS.statusbarcolor} />
      <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
    name="LoginScreen"
    component={LoginScreen}
    options={{headerShown: false}}
  />
  <Stack.Screen
  name="SignupScreen"
  component={SignupScreen}
  options={{headerShown: false}}
/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};