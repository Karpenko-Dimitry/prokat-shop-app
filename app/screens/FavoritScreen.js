import React from "react";
import { View, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "../../assets/images/images";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import { useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useDispatch } from "react-redux";
import { removeFavorit } from "../store/slicers/favoritsSlicer";

const FavoritScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const _width = Math.min(width, height)
    const styles = getStyles(colors, _width )
    const favorits = useSelector((state) => state.favoritsStore.favorits);

    const removeFromFavorites = (product) => {
        dispatch(removeFavorit({ product: product }))
    }

    const EmptyCart = () => {
        return (
            <View style={styles.emptyCartContainer}>
                <Image style={styles.emptyCartImage} source={images.favorits} />
                <Text style={styles.emptyCartText}>Список пуст</Text>
            </View>
        )
    }

    return (
        <>
            {favorits.length >= 1 ? (
                <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                    <View style={{ width: _width }}>
                        {favorits.length >= 1 && favorits.map((product) => {
                            const isDiscount = product?.price < product?.regular_price;
                            const priceColor = isDiscount ? 'red' : colors.text;

                            return (
                                <View key={product.id} style={styles.productBox}>
                                    <View style={styles.imageContainer}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Product', { name: product.name, item: product })}>
                                            <Image style={styles.image} source={{ uri: (product?.images?.length ? product.images[0].src : '') }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.descriptionTitle}>{product.name}</Text>
                                        <TouchableOpacity style={styles.heartIcon} onPress={() => removeFromFavorites(product)}>
                                            <Ionicons name={'heart-circle-outline'} size={scale(35)} color={companyColor} />
                                        </TouchableOpacity>
                                        <View style={styles.priceContainer}>
                                            {isDiscount && <Text style={styles.discountText}>{product.price ? product.regular_price + ' грн/мес' : ''}</Text>}
                                            <Text style={{ ...styles.priceText, color: priceColor }}>{product.price ? product.price + ' грн/мес' : ''}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            ) : <EmptyCart />}
        </>
    )
};

const getStyles = (colors, width) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: scale(15),
        },
        productBox: {
            marginBottom: scale(10),
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.border,
            padding: scale(10),
            borderRadius: scale(10),
            backgroundColor: colors.card
        },
        imageContainer: {
            alignItems: 'center'
        },
        descriptionContainer: {
            flex: 1,
            paddingHorizontal: scale(10),
            justifyContent: 'space-between'
        },
        descriptionTitle: {
            color: colors.text
        },
        priceContainer: {
            alignItems: 'flex-end'
        },
        image: {
            width: width * 0.3,
            height: width * 0.3,
            borderRadius: scale(10),
            resizeMode: 'contain',
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
        },
        counterConainer: {
            flexDirection: 'row',
            marginTop: scale(10)
        },
        counter: {
            width: scale(20),
            height: scale(20),
            justifyContent: 'center',
            alignItems: 'center'
        },
        counterText: {
            fontSize: scale(20),
            lineHeight: scale(20),
            color: colors.text,
            justifyContent: 'center',
            alignItems: 'center'
        },
        count: {
            fontSize: scale(14),
            color: colors.text,
            paddingHorizontal: scale(20)
        },
        emptyCartContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        emptyCartImage: {
            width: width,
            height: width
        },
        emptyCartText: {
            fontSize: scale(20),
            color: colors.text,
            letterSpacing: scale(2)
        },
        butonContainer: {
            marginTop: scale(10)
        }
    });

}

export default FavoritScreen;