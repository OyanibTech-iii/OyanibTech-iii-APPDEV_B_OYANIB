import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface CustomSearchbarProps {
  search: string;
  updateSearch: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomSeachbar: React.FC<CustomSearchbarProps> = ({ search, updateSearch, containerStyle }) => {
  return (
    <View style={[{ paddingTop: 20 }, containerStyle]}>
      <SearchBar
        placeholder="Search for products or courses..."
        onChangeText={updateSearch}
        value={search}
        platform="default"
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          paddingHorizontal: 30,
        }}
        inputContainerStyle={{
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 50,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        inputStyle={{
          textAlignVertical: 'center',
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#0f3a03',
        }}
        leftIconContainerStyle={{ marginLeft: 10 }}
        searchIcon={{ name: 'search', color: '#47bf24' }}
      />
    </View>
  );
};

export default CustomSeachbar;