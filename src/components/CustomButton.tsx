import React from 'react';
import { Dimensions, Text, TouchableOpacity, View, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  containerStyle, 
  label, 
  textStyle, 
  onPress, 
  loading = false 
}) => {
  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity 
      onPress={loading ? undefined : onPress} 
      disabled={loading}
      style={[
        { 
          paddingVertical: width * 0.02, 
          borderRadius: 10, 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#16a34a' 
        }, 
        containerStyle as ViewStyle
      ]}
    >
      {loading ? (
        <ActivityIndicator 
          color={
            textStyle && typeof textStyle === 'object' && 'color' in textStyle 
              ? (textStyle as TextStyle).color 
              : "#ffffff"
          } 
          size="small" 
        />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;