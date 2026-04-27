import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { IMG } from '../utils';
import { useAuth } from '../utils/AuthContext';
import CustomFooter from '../components/CustomFooter';
import { getProducts } from '../App/api/auth';

const { width } = Dimensions.get('window');

const ProductScreen = () => {
    const authData = useSelector(state => state.auth.data);
    
    const { user } = useAuth(); 
    
    const tabBarHeight = useBottomTabBarHeight();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = authData?.token || user?.token;

        if (token) {
            setLoading(true);
            getProducts(token)
                .then((res) => {
                    setProducts(res);
                })
                .catch((err) => {
                    console.error('Fetch error:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [authData?.token, user?.token]); 

    const renderProductItem = ({ item }) => (
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
            margin: 8,
            borderRadius: 15,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        }}>
            <View style={{
                width: '100%',
                height: 150,
                backgroundColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={IMG.LOGO}
                    style={{ width: '80%', height: '80%' }}
                    resizeMode="contain"
                />
            </View>
            <View style={{ padding: 12 }}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#0f3a03',
                    fontFamily: 'Poppins-Medium',
                }}>
                    {item.title}
                </Text>
                <Text style={{
                    fontSize: 14,
                    color: '#48bf24',
                    marginTop: 4,
                    fontWeight: 'bold',
                }}>
                    {item.price}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#48bf24" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingTop: 20,
                        paddingBottom: tabBarHeight + 20
                    }}
                    ListHeaderComponent={() => (
                        <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#0f3a03',
                                fontFamily: 'Poppins-Bold'
                            }}>
                                Our Products
                            </Text>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View style={{ marginTop: 30, marginBottom: 20, alignItems: 'center' }}>
                            <CustomFooter />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default ProductScreen;