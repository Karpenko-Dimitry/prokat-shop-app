import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { scale } from "../services/HelperService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slicers/cartSlicer";
import { removeFromCart } from "../store/slicers/cartSlicer";
import { images } from "../../assets/images/images";
import Button from "../components/Button";
import { useTheme } from "@react-navigation/native";

const CartScreen = ({ navigation }) => {
    const dispatcher = useDispatch();
    const { colors } = useTheme();
    const { width } = Dimensions.get('window');
    const styles = getStyles({ colors, width })
    const cartStore = useSelector((state) => state.cartStore.products);
    const amount = useMemo(() => {
        return cartStore.reduce((a, b) => a + b.product.price * b.count, 0)
    }, [cartStore])

    const checkout = () => {
        console.log('wwww')
    }


    const EmptyCart = () => {
        return (
            <View style={styles.emptyCartContainer}>
                <Image style={styles.emptyCartImage} source={images.empty_cart} />
                <Text style={styles.emptyCartText}>Корзина пуста</Text>
            </View>
        )
    }

    return (
        <>
            {cartStore.length >= 1 ? (
                <ScrollView style={styles.container}>
                    {cartStore.length >= 1 && cartStore.map((cart) => {
                        const isDiscount = cart.product?.price < cart.product?.regular_price;
                        const priceColor = isDiscount ? 'red' : colors.text;

                        return (
                            <View key={cart.product.id} style={styles.productBox}>
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Product', {name: cart.product.name, item: cart.product})}>
                                        <Image style={styles.image} source={{ uri: cart.product.images[0].src }} />
                                    </TouchableOpacity>
                                    <View style={styles.counterConainer}>
                                        <TouchableOpacity onPress={() => dispatcher(removeFromCart({ product: cart.product }))} style={styles.counter}><Text style={styles.counterText}>-</Text></TouchableOpacity>
                                        <Text style={styles.count}>{cart.count}</Text>
                                        <TouchableOpacity onPress={() => dispatcher(addToCart({ product: cart.product }))} style={styles.counter}><Text style={styles.counterText}>+</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionTitle}>{cart.product.name}</Text>
                                    <View style={styles.priceContainer}>
                                        {isDiscount && <Text style={styles.discountText}>{cart.product.price ? cart.product.regular_price + ' грн/мес' : ''}</Text>}
                                        <Text style={{ ...styles.priceText, color: priceColor }}>{cart.product.price ? cart.product.price + ' грн/мес' : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                    <View style={styles.butonContainer}>
                        <Button text={"Оформить заказ - " + amount + ' грн'} onPress={() => navigation.navigate('Checkout', { name: 'Оформить заказ' })} />
                    </View>
                </ScrollView>
            ) : <EmptyCart />}
        </>

    )
};

const getStyles = ({ colors, width }) => {
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

export default CartScreen;