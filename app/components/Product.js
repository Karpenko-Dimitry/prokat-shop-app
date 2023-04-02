import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { scale } from "../services/HelperService";
import { useTheme } from "@react-navigation/native";

const Product = ({ product, styles = {}, width, navigation }) => {
    const { colors } = useTheme();
    styles = getStyles({ colors, styles, width });

    let isDiscount = product.price < product.regular_price;
    let priceColor = isDiscount ? 'red' : colors.text;

    let DiscountLabel = ({color, text}) => {
        let style = StyleSheet.create({
            container: {
                position: 'absolute', 
                right: 0, 
                top: scale(20),
                backgroundColor: color || 'red', 
                color: 'white', 
                paddingHorizontal: scale(5), 
                paddingVertical: scale(2),
                borderRadius: scale(4)
            },
            text: {
                color: 'white',
                fontSize: scale(10),
            }
        });
        return (
            <View style={style.container}>
                <Text style={style.text}>{text}</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={() => navigation ? navigation.navigate('Product', {name: product.name, item: product}) : () => {}} style={styles.container}>
            {product.images[0]?.src && (<Image style={styles.image} source={{ uri: product.images[0].src }} />)}
            <View style={styles.textContainer}>
                <Text numberOfLines={3} style={styles.text}>{product.name}</Text>
            </View>
            <View style={styles.priceContiner}>
                {isDiscount && <Text style={styles.discountText}>{product.price ? product.regular_price + ' грн/мес' : ''}</Text>}
                <Text style={{ ...styles.priceText, color: priceColor }}>{product.price ? product.price + ' грн/мес' : ''}</Text>
            </View>
            {isDiscount && <DiscountLabel text="акция"/>}
        </TouchableOpacity>
    );
}

const getStyles = ({ colors, styles, width = 170 }) => {
    return StyleSheet.create({
        container: {
            position: 'relative',
            justifyContent: 'space-between',
            padding: scale(10),
            borderWidth: 1,
            borderColor: colors.border,
            marginTop: scale(10),
            ...(styles.container || {})
        },
        image: {
            borderRadius: scale(7),
            width: scale(width),
            height: scale(width),
            ...(styles.container || {})
        },
        textContainer: {
            width: scale(width),
        },
        text: {
            color: colors.text,
            fontSize: scale(12),
            textAlign: 'center'
        },
        priceContiner: {
            marginTop: scale(10),
        },
        priceText: {
            color: colors.text,
            fontWeight: 700,
            fontSize: scale(12),
        },
        discountText: {
            color: colors.text,
            textDecorationLine: 'line-through',
            fontSize: scale(10),
        }
    });
}

export default Product;