import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import { Product } from '../utils/types';

const { width } = Dimensions.get('window');

interface ProductCardProps {
    item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    // Correctly mapping to Symfony entity properties
    const isOutOfStock = !item.isAvailable; // Based on Product.php

    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                <View style={[styles.badge, isOutOfStock ? styles.outBadge : styles.inBadge]}>
                    <Text style={styles.badgeText}>{isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}</Text>
                </View>
                <Image
                    source={item.image ? { uri: `http://10.0.2.2:8000/uploads/images/${item.image}` } : require('../assets/images/no-bg.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>₱{item.price}</Text>
                <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                <View style={styles.footer}>
                    <Text style={styles.qtyText}>Qty: {item.currentStockQuantity || 0}</Text>
                    <Text style={styles.detailsBtn}>Details →</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFBF0', // Light beige from your screenshot
        width: (width / 2) - 20,
        margin: 8,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
    },
    imageWrapper: { height: 140, backgroundColor: '#f5f5f5' },
    image: { width: '100%', height: '100%' },
    badge: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        zIndex: 1,
    },
    inBadge: { backgroundColor: '#e8f5e9' },
    outBadge: { backgroundColor: '#ffebee' },
    badgeText: { fontSize: 8, fontWeight: 'bold', color: '#4caf50' },
    info: { padding: 12 },
    name: { fontSize: 15, fontWeight: '700', color: '#0f3a03' },
    price: { fontSize: 14, color: '#48bf24', fontWeight: 'bold', marginVertical: 2 },
    description: { fontSize: 11, color: '#888', marginBottom: 8 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qtyText: { fontSize: 10, color: '#999' },
    detailsBtn: { fontSize: 11, fontWeight: 'bold', color: '#0f3a03' },
});

export default ProductCard;