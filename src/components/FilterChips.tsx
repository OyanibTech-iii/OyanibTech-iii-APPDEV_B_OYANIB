import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import { Stock } from '../utils/types';

interface FilterChipsProps {
    stocks: Stock[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ stocks, activeCategory, onCategoryChange }) => {
    // Dynamically generate categories from stocks data
    const categories = useMemo(() => {
        if (!stocks || stocks.length === 0) return ['All Products'];
        
        const uniqueStockTypes = [...new Set(stocks.map((item: Stock) => item.stockType))];
        
        return ['All Products', ...uniqueStockTypes];
    }, [stocks]);

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {categories.map((cat: string) => {
                    const isActive = activeCategory === cat;

                    return (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => onCategoryChange(cat)}
                            activeOpacity={0.7}
                            style={[
                                styles.chip,
                                isActive ? styles.activeChip : styles.inactiveChip,
                            ]}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[
                                    styles.chipLabel,
                                    isActive ? styles.activeChipLabel : styles.inactiveChipLabel,
                                ]}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        minHeight: 62,
        backgroundColor: '#fdfdfd',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    chip: {
        minHeight: 34,
        paddingHorizontal: 16,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        maxWidth: 180,
    },
    activeChip: {
        backgroundColor: '#0f3a03',
        borderColor: '#0f3a03',
    },
    inactiveChip: {
        backgroundColor: '#fff',
        borderColor: '#eee',
    },
    chipLabel: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    activeChipLabel: {
        color: '#fff',
    },
    inactiveChipLabel: {
        color: '#666',
    },
});

export default FilterChips;