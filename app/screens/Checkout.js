import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
    Alert, Image, KeyboardAvoidingView, ActivityIndicator, Modal
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import Button from "../components/Button";
import WCOrderService from "../services/woocommerce/WCOrderService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../store/slicers/cartSlicer";
import { updateClientInfo } from "../store/slicers/clientInfo";
import { images } from "../../assets/images/images";
import { companyColor } from "../services/ColorService";
import Loader from "../components/Loader";

const Checkout = ({ navigation }) => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const _width = Math.min(width, height);
    const dispatcher = useDispatch();
    const styles = getStyles(colors, _width, height);
    const cartStore = useSelector((state) => state.cartStore.products);
    const clientInfoStore = useSelector((state) => state.clientInfoStore.info)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    let validate = (text, field) => {
        let errors = {};
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


        if (clientInfoStore.first_name.length < 2) {
            errors.firstName = `Минимум 2 символа`;
        }
        if (clientInfoStore.last_name.length < 2) {
            errors.lastName = `Минимум 2 символа`;
        }

        if (!regEmail.test(clientInfoStore.email)) {
            errors.email = `Не верный E-mail`;
        }
        if (clientInfoStore.phone.length < 10) {
            errors.phone = `Минимум 10 символа`;
        }

        setErrors(errors);

        return !Object.keys(errors).length
    }

    const checkout = () => {
        setLoading(true);
        setErrors([]);

        if (!validate()) {
            setLoading(false);
            return;
        }

        WCOrderService.store({
            payment_method: "bacs",
            set_paid: true,
            billing: {
                first_name: clientInfoStore.first_name || '',
                last_name: clientInfoStore.last_name || '',
                address_1: clientInfoStore.address || '',
                city: clientInfoStore.city || 'Одесса',
                email: clientInfoStore.email || '',
                phone: clientInfoStore.phone || ''
            },
            shipping: {
                first_name: clientInfoStore.first_name || '',
                last_name: clientInfoStore.last_name || '',
                address_1: clientInfoStore.address || '',
                city: clientInfoStore.city || 'Одесса',
                email: clientInfoStore.email || '',
                phone: clientInfoStore.phone || ''
            },
            line_items: cartStore.map(item => ({ product_id: item.product.id, quantity: item.count })),
        }).then(
            res => {
                setLoading(false);
                setSuccess(true);
                dispatcher(clearCart())
            }
        ).catch(res => {
            setLoading(false);

            let errorCode = res.data?.data?.status;

            if (errorCode === 400) {
                let errors = res.data?.data?.params || {};
                let result = []
                for (const key in errors) {
                    result.push(errors[key])
                }

                setErrors(result)
            } else {
                Alert.alert('Ошибка! Вы можете сделать заказа по телефону');
            }
        })
    }

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <View style={{ width: _width }}>
                    {cartStore.length >= 1 && cartStore.map((cart) => {
                        const isDiscount = cart.product?.price < cart.product?.regular_price;
                        const priceColor = isDiscount ? 'red' : colors.text;

                        return (
                            <View key={cart.product.id} style={styles.productBox}>
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Product', { name: cart.product.name, item: cart.product })}>
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
                    <KeyboardAvoidingView>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} onChangeText={(text) => dispatcher(updateClientInfo({ first_name: text }))} value={clientInfoStore.first_name} placeholder="Имя" placeholderTextColor={colors.text} />
                            {errors.firstName && (<Text style={styles.error}>{errors.firstName}</Text>)}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} onChangeText={(text) => dispatcher(updateClientInfo({ last_name: text }))} value={clientInfoStore.last_name} placeholder="Фамилия" placeholderTextColor={colors.text} />
                            {errors.lastName && (<Text style={styles.error}>{errors.lastName}</Text>)}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput editable={false} style={styles.input} value={'Одесса'} placeholder="Город" placeholderTextColor={colors.text} />
                            {errors.city && (<Text style={styles.error}>{errors.city}</Text>)}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} keyboardType="email-address" onChangeText={(text) => dispatcher(updateClientInfo({ email: text }))} value={clientInfoStore.email} placeholder="E-mail" placeholderTextColor={colors.text} />
                            {errors.email && (<Text style={styles.error}>{errors.email}</Text>)}
                        </View>
                        <View style={{ ...styles.inputContainer, marginBottom: scale(10) }}>
                            <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text) => dispatcher(updateClientInfo({ phone: text }))} value={clientInfoStore.phone} placeholder="Телефон" placeholderTextColor={colors.text} />
                            {errors.phone && (<Text style={styles.error}>{errors.phone}</Text>)}
                        </View>
                        <Button text={"Заказ подтверждаю"} onPress={checkout} />
                    </KeyboardAvoidingView >
                </View>


            </ScrollView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={success}
            >
                <View style={{ ...styles.container, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
                    <Image style={{ width: _width / 2, height: _width / 2 }} source={images.call_back} />
                    <Text style={{ fontSize: scale(22), color: colors.text }}>Cпасибо за заказ.</Text>
                    <Text style={{ marginBottom: scale(40), fontSize: scale(16), color: colors.text }}>Мы вам перезвоним</Text>
                    <Button text={"Назад"} onPress={() => {
                        setSuccess(false);
                        navigation.navigate('Cart')
                    }} />
                </View>
            </Modal>
            <Loader visible={loading} />
        </>
    )
}

const getStyles = (colors, width, height) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: scale(10),
        },
        inputContainer: {
            marginVertical: scale(5)
        },
        error: {
            color: 'red',
            fontSize: scale(10)
        },
        input: {
            height: scale(50),
            paddingHorizontal: scale(10),
            backgroundColor: colors.card,
            borderWidth: scale(1),
            borderRadius: scale(7),
            borderColor: colors.border,
            color: colors.text,
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
    })
}
export default Checkout;