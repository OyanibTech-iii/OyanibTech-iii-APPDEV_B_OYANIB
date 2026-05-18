import React, { useEffect, useMemo, useState, useContext } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_REQUEST, GET_QR_CODES_REQUEST } from '../App/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomFooter from '../components/CustomFooter';
import CustomMeatball from '../components/CustomMeatball';
import { useAuth } from '../utils/AuthContext';
import { RootState, User, QrCode, NavigationProp } from '../utils/types';
import routes from '../utils/routes';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const usersSlice = useSelector((state: RootState) => state.auth.users);
  const qrCodes = useSelector((state: RootState) => state.auth.qrCodes);
  const qrCodesLoading = useSelector((state: RootState) => state.auth.qrCodesLoading);
  const tabBarHeight = useContext(BottomTabBarHeightContext) || 0;

  const [qrModalVisible, setQrModalVisible] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch({ type: GET_USERS_REQUEST, payload: token });
      dispatch({ type: GET_QR_CODES_REQUEST, payload: token });
    }
  }, [dispatch, token]);

  const currentUser: User = useMemo(() => {
    const normalizeList = (slice: User[] | User) => {
      if (Array.isArray(slice)) return slice;
      if (slice && (slice as any).data && Array.isArray((slice as any).data)) return (slice as any).data;
      if (slice && (slice as any).results && Array.isArray((slice as any).results)) return (slice as any).results;
      if (slice && (slice as any)['hydra:member'] && Array.isArray((slice as any)['hydra:member'])) return (slice as any)['hydra:member'];
      return [];
    };

    const users = normalizeList(usersSlice);
    const loginUser: User = user || ({ email: '' } as User);
    const loginEmail = loginUser.email || loginUser.username || '';

    const matched =
      users.find((item: User) => {
        const apiEmail = item?.email || item?.username || '';
        return apiEmail && loginEmail && apiEmail === loginEmail;
      }) || loginUser;

    return matched || ({ email: '' } as User);
  }, [user, usersSlice]);

  const userQrCode = useMemo(() => {
    const normalizeList = (slice: QrCode[] | QrCode) => {
      if (Array.isArray(slice)) return slice;
      if (slice && (slice as any).data && Array.isArray((slice as any).data)) return (slice as any).data;
      if (slice && (slice as any)['hydra:member'] && Array.isArray((slice as any)['hydra:member'])) return (slice as any)['hydra:member'];
      return [];
    };
    const codes = normalizeList(qrCodes);
    
    // Find QR code matching current user
    // currentUser.id could be 1, codes[i].user could be "/api/users/1"
    const matched = codes.find((code: QrCode) => {
      const userId = currentUser.id;
      if (!userId) return false;
      return code.user === `/api/users/${userId}` || code.user === String(userId);
    });

    let path = matched?.qrCodePath || null;
    if (path && path.includes('localhost')) {
      path = path.replace('localhost', '127.0.0.1');
    }
    return path;
  }, [qrCodes, currentUser]);

  const fullName = useMemo(() => {
    const firstName = currentUser.firstName || currentUser.first_name || '';
    const lastName = currentUser.lastName || currentUser.last_name || '';
    const combined = `${firstName} ${lastName}`.trim();
    return combined || currentUser.username || currentUser.email || 'User';
  }, [currentUser]);

  const roleLabel = useMemo(() => {
    if (Array.isArray(currentUser.roles) && currentUser.roles.length > 0) {
      return String(currentUser.roles[0]).replace('ROLE_', '').toLowerCase();
    }
    return 'User';
  }, [currentUser]);

  const avatarUri = useMemo(() => {
    return (
      currentUser.avatar ||
      currentUser.avatarUrl ||
      currentUser.profileImage ||
      currentUser.profile_image ||
      null
    );
  }, [currentUser]);

  const initialLetter = useMemo(() => {
    const source =
      currentUser.lastName ||
      currentUser.last_name ||
      currentUser.firstName ||
      currentUser.first_name ||
      currentUser.username ||
      currentUser.email ||
      'U';

    return String(source).trim().charAt(0).toUpperCase() || 'U';
  }, [currentUser]);

  return (
    <View style={{ flex: 1, marginBottom: 70 }}>   
      <CustomMeatball 
        onQrPress={() => setQrModalVisible(true)} 
        onHomePress={() => navigation.navigate('TabNav', { screen: routes.HOME })}
        onCartPress={() => navigation.navigate('TabNav', { screen: routes.CART })}
        onCoursesPress={() => navigation.navigate('TabNav', { screen: routes.COURSES })}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{ position: 'relative' }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 65,
              backgroundColor: '#f8fafc',
              padding: 3,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e2e8f0'
            }}>
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  resizeMode='cover'
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    backgroundColor: '#1f6908',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#ffffff', fontSize: 34, fontFamily: 'Poppins-Bold' }}>
                    {initialLetter}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Text style={{ color: '#06450b', fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 15 }}>{fullName}</Text>
          <Text style={{ color: '#06450b', fontSize: 12, fontFamily: 'Poppins-Regular' }}>{roleLabel}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, paddingHorizontal: 10 }}>
          {[
            { icon: 'camera-outline', label: 'Set Photo' },
            { icon: 'pencil-outline', label: 'Edit Info' },
            { icon: 'settings-outline', label: 'Settings' }
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '28%',
                backgroundColor: '#ffffff',
                padding: 15,
                borderRadius: 15,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e2e8f0'
              }}
            >
              <Ionicons name={item.icon} size={20} color="#1e293b" />
              <Text style={{ color: '#1e293b', fontSize: 12, marginTop: 8}}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1, backgroundColor: '#ffffff', margin: 20, borderRadius: 12, padding: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#022e12', fontSize: 14 }}>
              {currentUser.phone || currentUser.mobile || 'N/A'}
            </Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Mobile</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#022e12', fontSize: 14 }}>
              {currentUser.bio || 'No bio available'}
            </Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Bio</Text>
          </View>

          <View>
            <Text style={{ color: '#022e12', fontSize: 14 }}>
              {currentUser.username || currentUser.email || 'N/A'}
            </Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Email</Text>
          </View>
        </View>
        <CustomFooter />
      </ScrollView>

      <Modal
        transparent={true}
        visible={qrModalVisible}
        animationType="fade"
        onRequestClose={() => setQrModalVisible(false)}
      >
        <Pressable 
          onPress={() => setQrModalVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#044b31' }}>Your QR Code</Text>
            
            {qrCodesLoading ? (
              <ActivityIndicator size="large" color="#1f6908" style={{ marginVertical: 30 }} />
            ) : userQrCode ? (
              <Image 
                source={{ uri: userQrCode.startsWith('http') ? userQrCode : `data:image/png;base64,${userQrCode}` }}
                style={{ width: 200, height: 200, marginBottom: 20 }}
                resizeMode="contain"
              />
            ) : (
              <View style={{ marginVertical: 30, alignItems: 'center' }}>
                <Ionicons name="alert-circle-outline" size={50} color="#64748b" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>No QR code available</Text>
              </View>
            )}

            <TouchableOpacity 
              onPress={() => setQrModalVisible(false)}
              style={{ width: '100%', padding: 12, backgroundColor: '#1f6908', borderRadius: 8, alignItems: 'center' }}
            >
              <Text style={{ fontWeight: '600', color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileScreen;