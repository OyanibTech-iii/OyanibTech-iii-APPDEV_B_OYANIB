import { View, Text, ImageBackground} from 'react-native'
import React from 'react'
import { IMG } from '../utils';

const CustomBackground = () => {
  return (
    <ImageBackground
      source={IMG.BACKGROUND}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ opacity: 0.1}}
      blurRadius={8} 
    ></ImageBackground>
  )
}

export default CustomBackground