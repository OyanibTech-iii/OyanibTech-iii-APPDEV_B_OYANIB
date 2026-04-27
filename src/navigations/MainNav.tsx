import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';

import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Product from '../screens/ProductScreen';
import TabNav from './TabNav';
import Courses from '../screens/CoursesScreen';
import ErrorNav from './ErrorNav';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNav" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TabNav"
        component={TabNav}
      />
      <Stack.Screen name={ROUTES.ERRORNAV} component={ErrorNav} />
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.PRODUCT} component={Product} />
      <Stack.Screen name={ROUTES.COURSES} component={Courses} />
    </Stack.Navigator>
  );
};

export default MainNavigation;