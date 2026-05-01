import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import CustomFooter from '../../components/CustomFooter';
import CustomTextInput from '../../components/CustomTextInput';
import CustomModal from '../../components/CustomModal';
import Icon from 'react-native-vector-icons/AntDesign';


import { IMG, ROUTES } from '../../utils';
import { useAuth } from '../../utils/AuthContext';
import { RootState, User, NavigationProp, RootStackParamList } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userGoogleLogin, resetLogin } from '../../App/reducers/auth';

const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  // --- STATE ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    type: 'error' | 'success';
  }>({ title: '', message: '', type: 'error' });

  // --- CONTEXT & REDUX ---
  const { login, setIsProcessing } = useAuth();

  const dispatch = useDispatch();

  // Select login state from Redux
  const { isLoading, data, isError, errorMessage } = useSelector((state: RootState) => state.auth);

  // --- REFS ---
  const successShownRef = useRef(false);
  const didSubmitRef = useRef(false);

  const showAlert = (title: string, message: string, type: 'error' | 'success' = 'error') => {
    setModalContent({ title, message, type });
    setModalVisible(true);
  };
  const authState = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    // console.log("Current Email State:", email);
    // console.log("Current Password State:", password);
  }, [email, password]);

  useEffect(() => {
    if (authState.data) {
        console.log("Successfully retrieved data from API:", authState.data);
    }
  }, [authState.data]);
  // Reset login state on component mount
  useEffect(() => {
    didSubmitRef.current = false;
    dispatch(resetLogin());
  }, [dispatch]);

  // Handle Success Logic
  useEffect(() => {
    // console.log('Login state:', { data, isLoading, isError, errorMessage });

    if (didSubmitRef.current && data && !isLoading && !isError && !successShownRef.current) {
      successShownRef.current = true;
      showAlert('Success', 'Login successful!', 'success');
    } else if (!data) {
      successShownRef.current = false;
    }
  }, [data, isLoading, isError, errorMessage]);

  useEffect(() => {
    if (didSubmitRef.current && isError && !isLoading) {
      // console.log('data:', data);
      // console.error('Login Error:', errorMessage);
      // showAlert('Login Error', errorMessage || 'Invalid credentials.');

    }
  }, [isError, isLoading, errorMessage]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomModal
        visible={modalVisible}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
        onClose={() => {
          setModalVisible(false);
          if (modalContent.type === 'success' && data) {
            setIsProcessing?.(true); 
            setTimeout(() => {
              const userToLogin = data.user || data.data?.user;
              if (userToLogin) {
                login?.(userToLogin);
              }
              setIsProcessing?.(false);
            }, 2500);
          }
        }}
      />

      <View>
        <Image
          source={IMG.LOGO}
          style={{ width: 300, height: 200, marginTop: 80 }}
          resizeMode="contain"
        />
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#0ea242', fontFamily: 'Poppins-Medium', marginBottom: 10 }}>
          Cultivating Green Futures
        </Text>

        <CustomTextInput
          label={'Email Address'}
          placeholder={'Email Address'}
          placeholderTextColor={'#84b675'}
          value={email}
          onChangeText={setEmail}
          containerStyle={{
            width: '80%',
            marginBottom: 8,
          }}
          labelStyle={{
            fontSize: 15,
            color: '#0f3a03',
            fontWeight: '700',
            fontFamily: 'Poppins-Medium',
          }}
          textStyle={{
            color: '#0f3a03',
            letterSpacing: 0.8,
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
          }}
        />

        <CustomTextInput
          label={'Password'}
          placeholder={'Password'}
          placeholderTextColor={'#94b28b'}
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          containerStyle={{
            width: '80%',
          }}
          labelStyle={{
            fontSize: 15,
            color: '#0f3a03',
            fontWeight: '700',
            fontFamily: 'Poppins-Medium',
          }}
          textStyle={{
            letterSpacing: 0.8,
            color: '#0f3a03',
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
          }}
        />
      </View>

      <CustomButton
        label={'Login'}
        containerStyle={{
          justifyContent: 'center',
          marginVertical: 10,
          width: '80%',
          backgroundColor: '#04691f',
          borderRadius: 10,
        }}
        textStyle={{
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
        }}
        loading={isLoading}
        onPress={() => {
          console.log("Attempting login with:", email, password);
          didSubmitRef.current = true;
          dispatch(
            userLogin({
              email,
              password,
            }),
          );
        }}
      />

      <CustomButton
        label={'Continue with Google'}
        icon={<Icon name="google" size={20} color="#1f6908" />}
        containerStyle={{
          justifyContent: 'center',
          marginVertical: 5,
          width: '80%',
          backgroundColor: '#ffffff',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#ddd',
        }}
        textStyle={{
          color: '#000000',
          textAlign: 'center',
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
        }}
        loading={isLoading}
        onPress={() => {
          console.log("Attempting Google login");
          didSubmitRef.current = true;
          dispatch(userGoogleLogin());
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'Poppins-Medium', color: '#0f3a03', fontSize: 12 }}>
          Not register yet?
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => navigation.navigate(ROUTES.REGISTER as keyof RootStackParamList)}        >
          <Text style={{ color: '#1f6908', fontFamily: 'Poppins-Bold', letterSpacing: 0.5, fontSize: 12 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <CustomFooter />

      <Image
        source={IMG.DECO}
        resizeMode='contain'
        style={{
          width: 180,
          height: 180,
          top: 540,
          left: 230,
          position: 'absolute',
        }}
      />
    </View>
  );
};

export default Login;