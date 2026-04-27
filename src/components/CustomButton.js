import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ containerStyle, label, textStyle, onPress }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress}>
        <View style={{ padding: width * 0.014, borderRadius:10, backgroundColor: '#16a34a', fontFamily: 'Glora Regular', }}>
          <Text style={textStyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;