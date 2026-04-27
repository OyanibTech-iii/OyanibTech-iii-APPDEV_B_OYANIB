import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { IMG } from '../utils';

const ReleaseNav = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'], // Reverse spin for logout
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 5,
          borderColor: 'grey', 
          borderTopColor: 'rgba(137, 129, 129, 0.15)',
          transform: [{ rotate: spin }],
        }} />

        <View style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}>
          <Image source={IMG.LOGO} style={{ width: 60, height: 60 }} resizeMode="contain" />
        </View>
      </View>

      <View style={{ marginTop: 40, alignItems: 'center', paddingHorizontal: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0c5226', marginBottom: 10 }}>
          Signing you out...
        </Text>
        <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center', opacity: 0.8, lineHeight: 22 }}>
          Securing your account session.{"\n"}Please wait a moment.
        </Text>
      </View>
    </View>
  );
};

export default ReleaseNav;