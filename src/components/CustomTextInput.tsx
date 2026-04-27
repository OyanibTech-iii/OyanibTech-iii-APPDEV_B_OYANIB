import React, { useState, useRef } from 'react';
import { Dimensions, Text, View, TouchableOpacity, Animated, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps {
  placeholder?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  label,
  labelStyle,
  value,
  containerStyle,
  textStyle,
  placeholderTextColor,
  isPassword = false,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 480,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !showPassword}
            autoComplete='off'
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              textStyle,
              {
                flex: 1,
                paddingBottom: 8,
                fontFamily: 'Poppins-Medium',
              },
            ]}

          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#16a34a"
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: '#185e04',
            width: '100%',
          }}
        />

        {/* Animated line */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 2,
            width: '100%',
            backgroundColor: '#16a34a',
            transform: [
              {
                scaleX: animatedValue,
              },
            ],
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;