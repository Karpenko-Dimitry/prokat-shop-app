import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ProductScreen = ({ route }) => {
    const product = route.params.item;

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>{product.name} --</Text>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '50%',
        padding: 10,
        backgroundColor: 'coral',
        borderRadius: 7
    }
});

export default ProductScreen;