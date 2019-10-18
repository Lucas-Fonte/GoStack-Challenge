import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Subscription from './pages/Subscription';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn, SignUp }),
        App: createMaterialBottomTabNavigator(
          { Dashboard, Subscription, Profile },
          {
            tabBarOptions: {
              keyboardHidesNavigationBar: true,
              activeColor: '#FFF',
              inactiveColor: 'rgba(255, 255, 255, 0.6)'
            },
            barStyle: { backgroundColor: '#170b12' }
          }
        )
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign'
      }
    )
  );
