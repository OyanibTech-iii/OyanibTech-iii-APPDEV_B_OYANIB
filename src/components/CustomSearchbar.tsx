import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface CustomSearchbarProps {
  search: string;
  updateSearch: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  placeholderTextColor?: string;
}

const CustomSearchbar: React.FC<CustomSearchbarProps> = ({ 
  search, 
  updateSearch, 
  containerStyle,
  placeholderTextColor = '#0f3a03',
  paddingHorizontal = 30
}) => {
  return (
    <View style={[{ paddingTop: 2 }, containerStyle]}>
      <SearchBar
        placeholder="Search for products ..."
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text?: string) => updateSearch(text || '')}
        onClear={() => updateSearch('')}
        value={search}
        platform="default"
        loadingProps={{}}
        showLoading={false}
        lightTheme={false}
        round={false}
        onFocus={() => {}}
        onBlur={() => {}}
        onCancel={() => {}}
        cancelButtonTitle=""
        cancelButtonProps={{}}
        showCancel={false}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          paddingHorizontal: paddingHorizontal,
        }}
        inputContainerStyle={{
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 50,
          elevation: 3,
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
        searchIcon={{ name: 'search', color: '#0a250237' ,size: 30 }}
        clearIcon={{ name: 'close', color: '#47bf24', onPress: () => updateSearch('') }}
      />
    </View>
  );
};

export default CustomSearchbar;