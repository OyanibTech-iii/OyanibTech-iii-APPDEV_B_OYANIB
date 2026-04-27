import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { IMG } from '../utils'; // Importing your centralized image object

const CustomCarousel = () => {  
  const ITEM_WIDTH = 300;
  const ITEM_HEIGHT = 150;

  // Mapping the utility constants to the FlatList data
  const DATA = [
    { id: '1', source: IMG.GARDEN1 },
    { id: '2', source: IMG.GARDEN2 },
    { id: '3', source: IMG.GARDEN3 },
    { id: '4', source: IMG.GARDEN4 },
    { id: '5', source: IMG.GARDEN5 },
    { id: '6', source: IMG.GARDEN6 },
  ];

  return (
    <View style={{ flex: 1, height: ITEM_HEIGHT, marginStart: 30, marginEnd: 30 }}>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, padding: 5 }}>
            <Image
              source={item.source} 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: '#e1e1e1',
                opacity: 0.9,
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default CustomCarousel;