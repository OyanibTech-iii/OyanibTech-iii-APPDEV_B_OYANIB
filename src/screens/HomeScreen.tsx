import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, ScrollView, TextStyle, TouchableOpacity } from 'react-native';
import { useAuth } from '../utils/AuthContext';
import { RootState, User } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_REQUEST } from '../App/actions';
import CustomFooter from '../components/CustomFooter';
import SocialMedia from '../components/SocialMedia';
import CustomCarousel from '../components/CustomCarousel';
import CustomSearchbar from '../components/CustomSearchbar';
import CustomHeader from '../components/CustomHeader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const usersSlice = useSelector((state: RootState) => state.auth.users);

  const [search, setSearch] = useState('');

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (token) {
      dispatch({ type: GET_USERS_REQUEST, payload: token });
    }
  }, [dispatch, token]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <CustomHeader showWelcome />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', color: '#072d14', marginLeft: 30, textAlign: 'left' as TextStyle['textAlign'] }}>Featured Gardens</Text>
        <CustomCarousel />
        <CustomSearchbar search={search} updateSearch={updateSearch} paddingHorizontal={20} />
        {/* <SocialMedia /> */}
        <CustomFooter />
      </ScrollView>

      <View style={{ height: 80 }} />
    </View>
  );
};

export default HomeScreen;