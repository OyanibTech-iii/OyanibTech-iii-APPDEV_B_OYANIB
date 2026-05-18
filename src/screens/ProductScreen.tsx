import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, View, ActivityIndicator, Text, Modal, Pressable, TouchableOpacity, TextStyle } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GET_PRODUCTS_REQUEST, GET_STOCKS_REQUEST } from '../App/actions';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';

import { RootState, Product, Stock, NavigationProp } from '../utils/types';
import CustomHeader from '../components/CustomHeader';
import routes from '../utils/routes';

const EMPTY_ARRAY: Product[] = [];

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp>();

    const token = useSelector((state: RootState) => state.auth.token);
    const productsSlice = useSelector((state: RootState) => state.auth.products);
    const stocksSlice = useSelector((state: RootState) => state.auth.stocks);
    const productsLoading = useSelector((state: RootState) => state.auth.productsLoading);

    const [category, setCategory] = useState('All Products');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const normalizeList = (slice: Product[] | Stock[] | Product | Stock) => {
        if (Array.isArray(slice)) return slice;
        if (slice && 'data' in slice && Array.isArray(slice.data)) return slice.data;
        if (slice && 'results' in slice && Array.isArray(slice.results)) return slice.results;
        if (slice && 'hydra:member' in slice && Array.isArray(slice['hydra:member'])) return slice['hydra:member'];
        return EMPTY_ARRAY;
    };

    const allProducts: Product[] = useMemo(() => normalizeList(productsSlice) as Product[], [productsSlice]);
    const allStocks: Stock[] = useMemo(() => normalizeList(stocksSlice) as Stock[], [stocksSlice]);
    // Keep product list usable even if stocks request is delayed/failed.
    const isLoading = productsLoading;

    useEffect(() => {
        if (token) {
            dispatch({ type: GET_PRODUCTS_REQUEST, payload: token });
            dispatch({ type: GET_STOCKS_REQUEST, payload: token });
        }
    }, [dispatch, token]); 

    const stockTypeByProductId = useMemo(() => {
        const map: { [key: string]: string } = {};
        allStocks.forEach((stock: Stock) => {
            const stockType = stock?.stockType;
            if (!stockType || !Array.isArray(stock?.products)) return;

            stock.products.forEach((productRef: Product | number | string) => {
                // API returns product IRIs like "/api/products/12"
                if (typeof productRef === 'string') {
                    const productId = productRef.split('/').pop();
                    if (productId) {
                        map[String(productId)] = stockType;
                    }
                } else if (productRef && typeof productRef === 'object' && 'id' in productRef && productRef.id != null) {
                    map[String(productRef.id)] = stockType;
                }
            });
        });
        return map;
    }, [allStocks]);

    const filteredData = useMemo(() => {
        if (category === 'All Products') {
            return allProducts;
        }
        return allProducts.filter((product: Product) => {
            const directStockType = product?.stockType;
            if (directStockType) {
                return directStockType === category;
            }

            const productId = product?.id != null ? String(product.id) : '';
            return stockTypeByProductId[productId] === category;
        });
    }, [category, allProducts, stockTypeByProductId]);

    const handleAddPress = (product: Product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleConfirmAdd = () => {
        setModalVisible(false);
        if (selectedProduct) {
            dispatch({ type: 'ADD_TO_CART', payload: selectedProduct });
        }
        navigation.navigate('TabNav', { screen: routes.CART });
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0f3a03" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
            <CustomHeader showWelcome />
            
            <FilterChips
                stocks={allStocks}
                activeCategory={category}
                onCategoryChange={setCategory}
            />

            <FlatList
                data={filteredData}
                renderItem={({ item }) => <ProductCard item={item} onAddPress={handleAddPress} />}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 100,
                    paddingHorizontal: 5,
                }}
                ListEmptyComponent={() => (
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Text>No products found in this category.</Text>
                    </View>
                )}
            />

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable 
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0f3a03', fontFamily: 'Poppins-Bold' }}>Add to Cart</Text>
                        <Text style={{ color: '#64748b', marginBottom: 20, textAlign: 'center', fontFamily: 'Poppins-Regular' }}>
                            Are you sure you want to add "{selectedProduct?.name}" to your cart?
                        </Text>
                        
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={{ flex: 1, padding: 12, backgroundColor: '#e2e8f0', borderRadius: 8, alignItems: 'center' }}
                            >
                                <Text style={{ fontWeight: '600', color: '#475569', fontFamily: 'Poppins-Medium' }}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={handleConfirmAdd}
                                style={{ flex: 1, padding: 12, backgroundColor: '#16a34a', borderRadius: 8, alignItems: 'center' }}
                            >
                                <Text style={{ fontWeight: '600', color: '#fff', fontFamily: 'Poppins-Medium' }}>Yes, Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default ProductScreen;