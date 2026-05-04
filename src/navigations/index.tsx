import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useDispatch} from 'react-redux';
import AuthNav from './AuthNav';
import MainNav from './MainNav';
import ProcessNav from './ProcessNav';
import ReleaseNav from './ReleaseNav';
import ErrorNav from './ErrorNav';
import { useAuth } from '../utils/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/types';
import { resetLogin } from '../App/reducers/auth';


export default () => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const { isError, errorMessage, isLoggedIn: isAuthLoggedIn } = useSelector((state: RootState) => state.auth);
  const { isProcessing, isReleasing } = useAuth();
  
  const handleRetry = () => {
    dispatch(resetLogin()); 
  };


  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#F2F2F2', true);
    }

    StatusBar.setBarStyle('dark-content', true);
  }, [isDarkMode]);

  // console.log('Auth Data (Redux): ', JSON.stringify(data, null, 2));
  // console.log('Auth User (Context): ', JSON.stringify(user, null, 2));
  console.log({errorMessage});

  return (
    <NavigationContainer>
      {isError ? (
        <ErrorNav message={errorMessage} onRetry={handleRetry} />
      ) : isReleasing ? (
        <ReleaseNav />
      ) : isProcessing ? (
        <ProcessNav />
      ) : isAuthLoggedIn ? (
        <MainNav />
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};