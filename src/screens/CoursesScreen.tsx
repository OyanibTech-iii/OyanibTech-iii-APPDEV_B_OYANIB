import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFooter from '../components/CustomFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../App/reducers/auth';
import { RootState, Course } from '../utils/types';

const CoursesScreen = () => {
  const dispatch = useDispatch();
  const { courses, coursesLoading, coursesError, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCourses(token));
    }
  }, [dispatch, token]);

  const renderCourseCard = (course: Course) => (
    <View key={course.id} style={{
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 15,
      marginBottom: 20,
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            {course.thumbnail && (
              <Image 
                source={{ uri: course.thumbnail }} 
                style={{ width: '100%', height: 100, borderRadius: 10, marginBottom: 10 }} 
                resizeMode="cover"
              />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1b6c05', flex: 1, fontFamily: 'Poppins-Bold' }}>
                {course.courseName}
              </Text>
              {course.tier && (
                <View style={{ backgroundColor: '#046e24', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginLeft: 5 }}>
                  <Text style={{ fontSize: 10, color: '#f7f8f7', fontWeight: 'bold' }}>{course.tier.toUpperCase()}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 12, color: '#666', marginTop: 5, marginBottom: 10 }}>
          {course.description}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={14} color="#16a34a" />
            <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}> {course.duration_left}</Text>
          </View>
          {course.price !== undefined && (
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#16a34a' }}>
              {typeof course.price === 'number' ? `$${course.price}` : course.price}
            </Text>
          )}
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
        <Text style={{ fontWeight: 'bold', color: '#000' }}>{course.progress}%</Text>
      </View>
    </View>
  );

  const courseData = Array.isArray(courses) ? courses : (courses as any)?.data || (courses as any)?.results || (courses as any)?.['hydra:member'] || [];

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 70 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Header Title */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f3a03', marginBottom: 20 }}>
          My Courses
        </Text>

        {coursesLoading ? (
          <ActivityIndicator size="large" color="#16a34a" />
        ) : coursesError ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>{coursesError}</Text>
        ) : (
          courseData.map((course: Course) => renderCourseCard(course))
        )}

      </ScrollView>
      <CustomFooter />
    </SafeAreaView >
  );
}

export default CoursesScreen;