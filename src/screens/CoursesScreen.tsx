import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFooter from '../components/CustomFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CoursesScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 70 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Header Title */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f3a03', marginBottom: 20 }}>
          My Courses
        </Text>

        {/* Course Card 1 */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 15,
          padding: 15,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 4, // Android Shadow
          shadowColor: '#000', // iOS Shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f3a03' }}>Machine Learning</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 5, marginBottom: 10 }}>
              The Machine learning basics program is designed to offer a solid foundation...
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={14} color="#16a34a" />
              <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}> 4 hours left</Text>
            </View>

            <TouchableOpacity style={{ marginTop: 15 }}>
              <Text style={{ color: '#16a34a', fontWeight: 'bold', fontSize: 14 }}>Start Learning</Text>
              <View style={{ height: 1, backgroundColor: '#16a34a', width: 95, marginTop: 2 }} />
            </TouchableOpacity>
          </View>

          {/* Progress Circle Placeholder */}
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 4,
            borderColor: '#16a34a',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15
          }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>40%</Text>
          </View>
        </View>

        {/* Course Card 2 */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 15,
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f3a03' }}>Data Science</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 5, marginBottom: 10 }}>
              Most people know the power Excel can wield, especially when used properly...
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={14} color="#16a34a" />
              <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}> 2 hours left</Text>
            </View>

            <TouchableOpacity style={{ marginTop: 15 }}>
              <Text style={{ color: '#16a34a', fontWeight: 'bold', fontSize: 14 }}>Start Learning</Text>
              <View style={{ height: 1, backgroundColor: '#16a34a', width: 95, marginTop: 2 }} />
            </TouchableOpacity>
          </View>

          {/* Progress Circle Placeholder */}
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 4,
            borderColor: '#16a34a',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15
          }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>60%</Text>
          </View>
        </View>

      </ScrollView>
      <CustomFooter />
    </SafeAreaView >
  );
}

export default CoursesScreen;