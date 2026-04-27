import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Text, View, ScrollView, Linking, TextStyle } from 'react-native';
import { AuthContext } from '../utils/AuthContext';
import { RootState, User } from '../utils/types';
import { IMG } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_REQUEST } from '../App/actions';
import CustomFooter from '../components/CustomFooter';
import SocialMedia from '../components/SocialMedia';
import CustomSeachbar from '../components/CustomSeachbar';
import Banner from '../components/Banner';
import CustomCarousel from '../components/CustomCarousel';
import CustomScrollContent from '../components/CustomScrollContent';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const token = useSelector((state: RootState) => state.auth.token);
  const usersSlice = useSelector((state: RootState) => state.auth.users);

  const [search, setSearch] = useState('');

  const updateSearch = (value : string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (token) {
      dispatch({ type: GET_USERS_REQUEST, payload: token });
    }
  }, [dispatch, token]);

  const welcomeMessage = useMemo(() => {
    const normalizeList = (slice: User[] | User) => {
      if (Array.isArray(slice)) return slice;
      if (slice && Array.isArray(slice.data)) return slice.data;
      if (slice && Array.isArray(slice.results)) return slice.results;
      if (slice && Array.isArray(slice['hydra:member'])) return slice['hydra:member'];
      return [];
    };

    const users = normalizeList(usersSlice);
    const loginUser: User = user || ({ email: '' } as User);
    const loginEmail = loginUser.email || loginUser.username || '';
    const matchedUser = users.find((u: User) => {
      const userEmail = u?.email || u?.username || '';
      return userEmail && loginEmail && userEmail === loginEmail;
    }) || loginUser;

    const lastName = matchedUser?.lastName || matchedUser?.last_name || matchedUser?.lastname || '';

    if (lastName) {
      return `Welcome to Growfico, ${lastName}`;
    }

    return 'Welcome to Growfico';
  }, [user, usersSlice]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>

      <CustomSeachbar search={search} updateSearch={updateSearch} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            color: '#0f3a03',
            marginHorizontal: 20,
          }}
        >
        </Text>
        <Text style={{ flex: 1, textAlign: 'center',fontFamily: 'Poppins-SemiBold', color: '#0f3a03', fontSize: 16 }}>{welcomeMessage}</Text>
        <Banner imageSource={IMG.BANNER2} />
        <Banner imageSource={IMG.BANNER3} />
        <Banner imageSource={IMG.BANNER4} />
        <Banner />

        <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Poppins-Medium', color: '#072d14', marginLeft: 30, textAlign: 'left' as TextStyle['textAlign'] }}>Garden Transformed </Text>
        <CustomCarousel />
        <CustomScrollContent />
        <SocialMedia />
        <CustomFooter />
      </ScrollView>

      <View style={{ height: 80 }} />
    </View>
  );
};

export default HomeScreen;