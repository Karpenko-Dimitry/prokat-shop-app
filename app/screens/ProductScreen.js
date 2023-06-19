import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Share, ScrollView, TouchableOpacity } from "react-native";
import { scale } from "../services/HelperService";
import Banner from "../components/Banner";
import { companyColor } from "../services/ColorService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slicers/cartSlicer";
import { toggleFavorit } from "../store/slicers/favoritsSlicer";
import { useTheme } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import Phone from "../components/Phone";

const ProductScreen = ({ route }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const product = route?.params?.item || null;
    
    const { width, height } = Dimensions.get('window');
    const _width = Math.min(width, height)

    const styles = getStyles({ colors })
    const isDiscount = product?.price < product?.regular_price;
    const priceColor = isDiscount ? 'red' : colors.text;
    const [heartColor, setHeartColor] = useState(colors.text);

    const favorits = useSelector((state) => state.favoritsStore.favorits)

    useEffect(() => {
        let index = favorits.findIndex((item => item.id == product.id));

        if (index !== -1) {
            setHeartColor(companyColor) 
        } else {
            setHeartColor(colors.text)
        }

    }, [favorits])

    const addCart = (product) => {
        dispatch(addToCart({ product: product }));
    }

    const addToFavorites = () => {
        dispatch(toggleFavorit({ product: product }))
    }

    const onShare = async () => {
        try {
            const result = await Share.share({ title: product.name, url: product.permalink, message: product.permalink });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            // Alert.alert(error.message);
        }
    };

    return (
        <>
            {product && (
                <ScrollView style={styles.container}>
                    <View style={styles.bannerContainer}>
                        <Banner width={_width - (scale(15) * 2)} images={product.images} />
                        <TouchableOpacity style={styles.heartIcon} onPress={addToFavorites}>
                            <Ionicons name={'heart-circle-outline'} size={scale(35)} color={heartColor} />
                        </TouchableOpacity>
                    </View >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{product.name}</Text>
                        <TouchableOpacity onPress={onShare}>
                            <Ionicons name={'share-social-outline'} size={scale(22)} color={colors.text} />
                        </TouchableOpacity>

                    </View >

                    <View style={styles.priceContainer}>
                        <View style={styles.priceBox}>
                            <Text style={{ ...styles.priceText, color: priceColor }}>{product.price ? product.price + ' грн/мес' : ''}</Text>
                            {isDiscount && <Text style={styles.discountText}>{product.price ? product.regular_price + ' грн/мес' : ''}</Text>}
                        </View>
                        <View style={styles.buttonRow}>
                            <Phone size={scale(80)} position="relative"/>
                            <TouchableOpacity onPress={() => addCart(product)} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    В корзину
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View >
                    <View style={styles.shortDescriptionContainer}>
                        <Text style={styles.descriptionText}>{product.short_description}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Описание:</Text>
                        <Text style={styles.descriptionText}>{product.description}</Text>
                    </View>
                </ScrollView>
            )}
        </>


    )
}
const getStyles = ({ colors }) => {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        bannerContainer: {
            alignItems: 'center',
            paddingVertical: scale(10),
            paddingHorizontal: scale(15)
        },
        heartIcon: {
            position: 'absolute',
            top: scale(20),
            left: scale(20),
        },
        titleContainer: {
            paddingHorizontal: scale(15),
            paddingVertical: scale(10),
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        title: {
            fontSize: scale(15),
            fontWeight: 500
        },
        priceContainer: {
            paddingVertical: scale(10),
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: colors.border,
            borderBottomWidth: 1
        },
        priceBox: {
            flexDirection: 'row',
            alignItems: 'flex-end'
        },
        priceText: {
            color: colors.text,
            fontWeight: 400,
            fontSize: scale(18),
            marginRight: scale(5)
        },
        discountText: {
            color: colors.text,
            textDecorationLine: 'line-through',
            fontSize: scale(12),
        },
        descriptionContainer: {
            paddingVertical: scale(10),
            paddingHorizontal: scale(15),
            borderBottomColor: colors.border,
            borderBottomWidth: 1
        },
        shortDescriptionContainer: {
            paddingHorizontal: scale(15),
            borderBottomColor: colors.border,
            borderBottomWidth: 1
        },
        descriptionTitle: {
            color: colors.text,
            fontSize: scale(15),
            fontWeight: 500,
            marginBottom: 10,
            textTransform: 'uppercase'
        },
        descriptionText: {
            color: colors.text,
            lineHeight: scale(20),
            textAlign: "justify"
        },
        buttonRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        button: {
            marginLeft: scale(20),
            padding: scale(10),
            height: scale(42),
            backgroundColor: companyColor,
            elevation: 20,
            borderWidth: 1,
            borderColor: companyColor,
            borderRadius: 7,
            shadowOffset: {
                width: 5,
                height: 5
            },
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },
        buttonText: {
            color: "#fff"
        }
    })
}

export default ProductScreen;