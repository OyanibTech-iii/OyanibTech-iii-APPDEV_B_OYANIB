import React from 'react';
import { View, ImageBackground, ImageSourcePropType } from 'react-native';
import { IMG } from '../utils';

const Banner = ({ imageSource }: { imageSource?: ImageSourcePropType }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <View style={{
        height: 150,
        width: 300,
        borderRadius: 12,
        overflow: 'hidden'
      }}>
        <ImageBackground
          source={imageSource || IMG.BANNER}
           resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          imageStyle={{ opacity: 0.8 }}
        >
        </ImageBackground>

      </View>
    </View>
  );
};

export default Banner;