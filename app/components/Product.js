import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme, TouchableOpacity } from "react-native";
import { colors } from "../services/ColorService";
import { scale } from "../services/HelperService";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Product = ({ product, styles = {}, width, navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const modeColors = isDarkMode ? colors.darkModeColors : colors.whiteModeColors;

    styles = getStyles({ styles, isDarkMode, width });

    let isDiscount = product.price < product.regular_price;
    let priceColor = isDiscount ? 'red' : modeColors.textColor;

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
            {isDiscount && <DiscountLabel text="cкидка"/>}
        </TouchableOpacity>
    );
}

const getStyles = ({ styles, isDarkMode, width = 170 }) => {
    const modeColors = isDarkMode ? colors.darkModeColors : colors.whiteModeColors;

    return StyleSheet.create({
        container: {
            position: 'relative',
            justifyContent: 'space-between',
            padding: scale(10),
            borderWidth: 1,
            borderColor: modeColors.borderColor,
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
            color: modeColors.textColor,
            fontSize: scale(12),
            textAlign: 'center'
        },
        priceContiner: {
            marginTop: scale(10),
        },
        priceText: {
            color: modeColors.textColor,
            fontWeight: 700,
            fontSize: scale(12),
        },
        discountText: {
            color: modeColors.textColor,
            textDecorationLine: 'line-through',
            fontSize: scale(10),
        }
    });
}

export default Product;