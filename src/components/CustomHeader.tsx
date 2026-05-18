import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Icon, Badge } from 'react-native-elements';
import React, { useMemo, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_REQUEST } from '../App/actions';
import { useAuth } from '../utils/AuthContext';
import { RootState, User, NavigationProp } from '../utils/types';
import routes from '../utils/routes';

interface CustomHeaderProps {
  showWelcome?: boolean;
}

const CustomHeader = ({ showWelcome }: CustomHeaderProps) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  const usersSlice = useSelector((state: RootState) => state.auth.users);
  const cart = useSelector((state: RootState) => state.auth.cart);

  const cartCount = useMemo(() => cart.length, [cart]);

  useEffect(() => {
    if (token && (!usersSlice || usersSlice.length === 0)) {
      dispatch({ type: GET_USERS_REQUEST, payload: token });
    }
  }, [dispatch, token, usersSlice]);

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

  const welcomeMessage = useMemo(() => {
    const lastName = currentUser?.lastName || currentUser?.last_name || currentUser?.lastname || '';

    if (lastName) {
      return `${lastName}, \nWelcome to Growfico`;
    }

    return 'Welcome to Growfico';
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
     <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: showWelcome ? 'space-between' : 'flex-end',
        paddingTop: 20,
        paddingLeft: showWelcome ? 20 : 0,
        paddingRight: 40,
        paddingBottom: 20,
        width: '100%'
      }}>
        {showWelcome && (
          <Text style={{ 
            marginTop: 20, 
            fontFamily: 'Poppins-Medium', 
            color: '#0f3a03', 
            fontSize: 12 
          }}>
            {welcomeMessage}
          </Text>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('TabNav', { screen: routes.CART })}
            style={{ marginTop: 20, position: 'relative' }}
          >
            <Icon name="cart-outline" type="ionicon" color="#144306aa" size={25} />
            <Badge
              value={cartCount.toString()}
              status="error"
              containerStyle={{ position: 'absolute', top: -8, right: -6 }}
              badgeStyle={{ backgroundColor: '#e51313' }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, marginLeft: 15, position: 'relative' }}>
            <Icon name="notifications-outline" type="ionicon" color="#144306aa" size={25} />
            <Badge
              value="5"
              status="error"
              containerStyle={{ position: 'absolute', top: -8, right: -6 }}
              badgeStyle={{ backgroundColor: '#e51313' }}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate(routes.PROFILE as any)}
            style={{ marginTop: 20, marginLeft: 15, position: 'relative' }}
          >
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            ) : (
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#1f6908',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold' }}>
                  {initialLetter}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default CustomHeader