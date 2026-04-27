import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ProcessNav = () => {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#ffffff', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <ActivityIndicator size="large" color="#47bf24" />
      <Text style={{ 
        marginTop: 15, 
        fontFamily: 'Poppins-Medium', 
        color: '#0f3a03',
        fontSize: 16 
      }}>
        Authenticating...
      </Text>
    </View>
  );
};

export default ProcessNav;