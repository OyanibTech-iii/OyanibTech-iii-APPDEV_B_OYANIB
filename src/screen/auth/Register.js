import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { IMG, ROUTES } from '../../utils';
import CustomFooter from '../../components/CustomFooter';
import CheckBox from '@react-native-community/checkbox';
import CustomModal from '../../components/CustomModal';
import { userRegister, resetRegister } from '../../App/reducers/auth';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { registerData, registerLoading, registerError, registerErrorMessage } = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'error' });
  const [isChecked, setIsChecked] = useState(false);
  const successShownRef = useRef(false);
  const didSubmitRef = useRef(false);

  const showAlert = (title, message, type = 'error') => {
    setModalContent({ title, message, type });
    setModalVisible(true);
  };

  useEffect(() => {
    if (didSubmitRef.current && registerData && !registerLoading && !registerError && !successShownRef.current) {
      successShownRef.current = true;
      showAlert('Success', 'Account created successfully!', 'success');
    } else if (!registerData) {
      successShownRef.current = false;
    }
  }, [registerData, registerLoading, registerError]);

  useEffect(() => {
    if (didSubmitRef.current && registerError && !registerLoading) {
      showAlert('Registration Error', registerErrorMessage || 'Registration failed.');
    }
  }, [registerError, registerLoading, registerErrorMessage]);

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (trimmedEmail === '' || password === '' || confirmPassword === '') {
      showAlert('Invalid Credentials', 'Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showAlert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Password Mismatch', 'Passwords do not match. Try again!');
      return;
    }

    if (!isChecked) {
      showAlert('Terms Not Accepted', 'Please accept the Terms and Privacy Policy to proceed.');
      return;
    }

    didSubmitRef.current = true;
    dispatch(userRegister({ email: trimmedEmail, password }));
  };

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <CustomModal
        visible={modalVisible}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
        onClose={() => {
          setModalVisible(false);
          if (modalContent.type === 'success') {
            dispatch(resetRegister());
            navigation.navigate(ROUTES.LOGIN);
          }
        }}
      />

      <View >
        <Image source={IMG.LOGO} style={{ width: 300, height: 200, }} resizeMode="contain" />
      </View>

      <View style={{ width: '100%', alignItems: 'center', }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1d733b', fontFamily: 'Poppins-Regular', textAlign: 'center', marginBottom: 10 }}>Nurture your garden and track your {"\n"} growth journey with Growfico.</Text>

        <CustomTextInput
          label={'Email Address'}
          placeholder={'Email Address'}
          placeholderTextColor={'#94b28b'}
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
            color: '#47bf24',
            letterSpacing: .8,
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
            fontFamily: 'Poppins-Medium',
          }}
          labelStyle={{
            fontSize: 15,
            color: '#0f3a03',
            fontWeight: '700',
            fontFamily: 'Poppins-Medium',
          }}
          textStyle={{
            color: '#47bf24',
            letterSpacing: .8,
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
          }}
        />
        <CustomTextInput
          label={'Confirm Password'}
          placeholder={'Confirm Password'}
          placeholderTextColor={'#94b28b'}
          value={confirmPassword} 
          onChangeText={setConfirmPassword}
          isPassword={true}
          containerStyle={{
            width: '80%',
            fontFamily: 'Poppins-Medium',
          }}
          labelStyle={{
            marginTop: 8,
            fontSize: 15,
            color: '#0f3a03',
            fontWeight: '700',
            fontFamily: 'Poppins-Medium',
          }}
          textStyle={{
            color: '#47bf24',
            letterSpacing: .8,
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
          }}
        />
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: '#1f6908', false: '#0f3a03' }}
          />
          <Text style={{ fontFamily: 'Poppins-Medium', color: '#0f3a03', fontSize: 12 }}>I agree to the</Text>
          <TouchableOpacity
            style={{ marginLeft: 5, }}
            onPress={() => navigation.navigate(ROUTES.TERMS_POLICY)}
          >
            <Text style={{ color: '#1f6908', fontFamily: 'Poppins-Bold', letterSpacing: .5, fontSize: 12 }}>Terms and Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          label={'Create Account'}
          containerStyle={{
            marginVertical: 10,
            width: '80%',
            backgroundColor: '#47bf24',
            borderRadius: 10,
            fontFamily: 'Poppins-Medium',
          }}
          textStyle={{
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Poppins-Medium',
          }}
          loading={registerLoading}
          onPress={handleRegister}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'Poppins-Medium', color: '#0f3a03', fontSize: 12 }}>Already have an account?</Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          <Text style={{ color: '#1f6908', fontFamily: 'Poppins-Bold', letterSpacing: .5, fontSize: 12 }}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={IMG.DECO2}
        resizeMode='contain'
        style={{
          width: 180,
          height: 180,
          top: 550,
          right: 230,
          position: 'absolute',
        }}
      />
      <CustomFooter />
    </View>
  );
};

export default Register;