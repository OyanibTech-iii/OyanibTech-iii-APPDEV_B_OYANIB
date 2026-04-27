import { View, Text } from 'react-native'
import React from 'react'

const CustomFooter = () => {

  return (
 
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 }}>
        <Text style={{ fontFamily: 'Poppins-Medium', color: '#123e06ce', fontSize: 10 }}>©{new Date().getFullYear()} Growfico. All rights reserved.</Text>
      </View>

  )
}

export default CustomFooter