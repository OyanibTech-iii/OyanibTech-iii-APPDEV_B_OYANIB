import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomFooter from '../components/CustomFooter';
import { IMG } from '../utils';

const ProfileScreen = () => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const handleLogout = () => {
    setLogoutModalVisible(false);
    setMenuVisible(false);
    // Add auth logic here
  };

  return (
    <View style={{ flex: 1, marginBottom: 70 }}>

      {/* --- LOGOUT MODAL --- */}
      <Modal visible={logoutModalVisible} transparent={true} animationType="fade">
        <Pressable
          onPress={() => setLogoutModalVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ef4444', marginBottom: 10 }}>Logout</Text>
            <Text style={{ color: '#4b5563', marginBottom: 20 }}>Are you sure you want to logout?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity onPress={() => setLogoutModalVisible(false)} style={{ padding: 10, backgroundColor: '#9ca3af', borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: '#ef4444', borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* --- HEADER --- */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, zIndex: 10 }}>
        {/* Changed Icon colors to dark for white background */}
        <Ionicons name="grid-outline" size={24} color="#1e293b" />
        <View>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="ellipsis-vertical" size={24} color="#1e293b" />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {menuVisible && (
            <TouchableOpacity
              onPress={() => { setLogoutModalVisible(true); setMenuVisible(false); }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                gap: 5,
                right: 0,
                top: 30,
                backgroundColor: '#f1f5f9', // Light gray for menu
                padding: 12,
                borderRadius: 8,
                width: 90,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Text style={{ color: '#ef4444', fontWeight: '600' }}>Logout</Text>
              <Ionicons name="power-outline" size={16} color="#ef4444" style={{ marginLeft: 5, fontWeight: '600' }} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}>
        {/* --- PROFILE PIC & NAME --- */}
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: '#f8fafc',
            padding: 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e2e8f0'
          }}>
            <Image
              source={IMG.PROFILE_PIC}
              resizeMode='cover'
              style={{ width: 124, height: 124, borderRadius: 62 }}
            />
          </View>
          <Text style={{ color: '#1e293b', fontSize: 24, fontWeight: 'bold', marginTop: 15 }}>Pacifico Oyanib</Text>
          <Text style={{ color: '#64748b', fontSize: 14 }}>online</Text>
        </View>

        {/* --- BUTTON ROW --- */}
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
                backgroundColor: '#f1f5f9', // Light gray buttons
                padding: 15,
                borderRadius: 15,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e2e8f0'
              }}
            >
              <Ionicons name={item.icon} size={24} color="#1e293b" />
              <Text style={{ color: '#1e293b', fontSize: 11, marginTop: 8, fontWeight: '500' }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- INFO CARD --- */}
        {/* Changed background to a soft off-white/gray and fixed the color hex */}
        <View style={{ backgroundColor: '#f6f9f8', margin: 20, borderRadius: 12, padding: 20, }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#022e12', fontSize: 16, }}>phone</Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Mobile</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#022e12', fontSize: 16 }}>bio</Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Bio</Text>
          </View>

          <View>
            <Text style={{ color: '#022e12', fontSize: 16 }}>username</Text>
            <Text style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Username</Text>
          </View>
        </View>
        <CustomFooter />

      </ScrollView>

    </View>
  );
};

export default ProfileScreen;