import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, View, ActivityIndicator, Text } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCTS_REQUEST, GET_STOCKS_REQUEST } from '../App/actions';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';

import { RootState, Product, Stock } from '../utils/types';

const EMPTY_ARRAY: Product[] = [];

const ProductScreen = () => {
    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.auth.token);
    const productsSlice = useSelector((state: RootState) => state.auth.products);
    const stocksSlice = useSelector((state: RootState) => state.auth.stocks);
    const productsLoading = useSelector((state: RootState) => state.auth.productsLoading);

    const normalizeList = (slice: Product[] | Stock[] | any) => {
        if (Array.isArray(slice)) return slice;
        if (slice && Array.isArray(slice.data)) return slice.data;
        if (slice && Array.isArray(slice.results)) return slice.results;
        if (slice && Array.isArray(slice['hydra:member'])) return slice['hydra:member'];
        return EMPTY_ARRAY;
    };

    const allProducts: Product[] = useMemo(() => normalizeList(productsSlice), [productsSlice]);
    const allStocks: Stock[] = useMemo(() => normalizeList(stocksSlice), [stocksSlice]);
    // Keep product list usable even if stocks request is delayed/failed.
    const isLoading = productsLoading;

    const [category, setCategory] = useState('All Products');

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

            stock.products.forEach((productRef: Product | number | any) => {
                // API returns product IRIs like "/api/products/12"
                if (typeof productRef === 'string') {
                    const productId = productRef.split('/').pop();
                    if (productId) {
                        map[String(productId)] = stockType;
                    }
                } else if (productRef && productRef.id != null) {
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

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0f3a03" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
            <FilterChips
                stocks={allStocks}
                activeCategory={category}
                onCategoryChange={setCategory}
            />

            <FlatList
                data={filteredData}
                renderItem={({ item }) => <ProductCard item={item} />}
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
        </View>
    );
};

export default ProductScreen;