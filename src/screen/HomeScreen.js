import React, { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { IMG, ROUTES } from '../utils';
import { AuthContext } from '../utils/AuthContext';
import CustomFooter from '../components/CustomFooter';
import SocialMedia from '../components/SocialMedia';
import CustomSeachbar from '../components/CustomSeachbar';
import Banner from '../components/Banner';
import CustomCarousel from '../components/CustomCarousel';
import CustomScrollContent from '../components/CustomScrollContent';


const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open this URL: " + url);
    }
  };

  const [search, setSearch] = useState('');

  const updateSearch = (value) => {
    setSearch(value);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>

      <CustomSeachbar search={search} updateSearch={updateSearch} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Banner />
        <Text style={{ marginTop: 30, fontSize: 16, fontFamily: 'Poppins-Medium', color: '#072d14', marginLeft: 30, textAlign: 'start' }}>Garden Transformed </Text>
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