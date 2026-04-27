import { View, Text, Image, ScrollView } from 'react-native';
import { IMG } from '../utils';
import React from 'react';

const CustomScrollContent = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* --- Main Hero Section --- */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        backgroundColor: '#f3f8f4', // Soft mint background
        margin: 15,
        borderRadius: 25,
        height: 180,
        overflow: 'hidden'
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontFamily: 'Poppins-Medium', 
          color: '#072d14', 
          lineHeight: 24,
          flex: 1 
        }}>
          Let's start {"\n"}Cultivate our Green{"\n"}and Healthy future {"\n"}together. 
        </Text>
        <Image 
          source={IMG.ORGANIC2} 
          style={{ width: 140, height: 140, marginBottom: -20 }} 
          resizeMode="contain" 
        />
      </View>

      {/* --- Category List Section --- */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        
        {/* Item Block Wrapper function to keep it clean */}
        {[
          { img: IMG.ORGANIC2, label: "Organic Products" },
          { img: IMG.ORGANIC3, label: "Organic Lifestyle" },
          { img: IMG.POT1, label: "Potted Plants" },
          { img: IMG.POT2, label: "Indoor Gardening" },
          { img: IMG.POT3, label: "Garden Decor" },
        ].map((item, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            padding: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#f0f0f0', // Very light border for definition
          }}>
            {/* Image Circle Container */}
            <View style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image 
                source={item.img} 
                style={{ width: 50, height: 50 }} 
                resizeMode="contain" 
              />
            </View>

            <Text style={{ 
              fontSize: 15, 
              fontFamily: 'Poppins-Medium', 
              color: '#072d14', 
              marginLeft: 20 
            }}>
              {item.label}
            </Text>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

export default CustomScrollContent;