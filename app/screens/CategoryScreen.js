import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { scale } from "../services/HelperService";

const CategoryScreen = ({ navigation, route }) => {
    const category = route.params.item;
    const { width } = Dimensions.get('window');
    const productsStore = useSelector((state => state.productsStore.products));
    const products = useMemo(() => {
        return productsStore.filter(product => {
            let productCategories = product.categories.map(category => category.id);
            return productCategories.includes(category.id);
        });
    }, [category]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.productsContainer}>
                {products.length > 0 && (
                    products.map(product => (<Product key={product.id} navigation={navigation} product={product} width={width / 3 - scale(40)} />))
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productsContainer: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CategoryScreen;