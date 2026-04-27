import { View, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SocialMedia = () => {
  return (
  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/share/1HmU854hpd/')}>
            <Ionicons name="logo-facebook" size={24} color="#0f3a03" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/growficoofficial')}>
            <Ionicons name="logo-github" size={24} color="#0f3a03" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/growficoofficial')}>
            <Ionicons name="logo-linkedin" size={24} color="#0f3a03" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/growficoofficial')}>
            <Ionicons name="logo-instagram" size={24} color="#0f3a03" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
        </View>

  )
}

export default SocialMedia