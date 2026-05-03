import React, { useMemo } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import { Product } from '../utils/types';

const { width } = Dimensions.get('window');

interface ProductCardProps {
    item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    // Correctly mapping to Symfony entity properties
    const isOutOfStock = !item.isAvailable; // Based on Product.php

    const productUri = useMemo(() => {
        return (
            item.image ||
            (item as any).imageUrl ||
            (item as any).productImage ||
            (item as any).product_image ||
            null
        );
    }, [item]);

    return (
        <View style={{
            backgroundColor: '#FFFBF0',
            width: (width / 2) - 20,
            margin: 8,
            borderRadius: 20,
            overflow: 'hidden',
            elevation: 2,
        }}>
            <View style={{ height: 140, backgroundColor: '#f5f5f5' }}>
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                    zIndex: 1,
                    backgroundColor: isOutOfStock ? '#ffebee' : '#e8f5e9'
                }}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#4caf50' }}>
                        {isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
                    </Text>
                </View>
                {productUri ? (
                    <Image
                        source={{ uri: productUri }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                ) : null}
            </View>
            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#0f3a03' }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ fontSize: 14, color: '#48bf24', fontWeight: 'bold', marginVertical: 2 }}>₱{item.price}</Text>
                <Text style={{ fontSize: 11, color: '#888', marginBottom: 8 }} numberOfLines={1}>{item.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, color: '#999' }}>Qty: {item.currentStockQuantity || 0}</Text>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0f3a03' }}>Details →</Text>
                </View>
            </View>
        </View>
    );
};

export default ProductCard;