import React from "react";
import { Linking, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import { PHONE_NUMBER_MTS, PHONE_NUMBER_KS } from "../../env";

import Phone from "../components/Phone"

const DeliveryScreen = () => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const styles = getStyles(colors, width, height);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textBox}>
                <Text style={{ ...styles.text }}>
                    <Text style={{ ...styles.text, fontWeight: 600 }}>Получить заказ </Text>
                    вы можете на условиях самовывоза по адресу: пункт выдачи Одесса, р-н Таирова, ул. Рыбачья, д.23/25, либо заказать доставку
                </Text>
            </View>
            <View style={styles.textBox}>
                <Text style={{ ...styles.text, fontWeight: 600 }}>Телефоны:</Text>
                <View style={styles.phoneBox}>
                    <Text style={{ ...styles.text, marginRight: scale(10) }}>Киевстар: {PHONE_NUMBER_KS}</Text>
                    <Phone phoneNumber={PHONE_NUMBER_KS} size="35" position="relative" />
                </View>
                <View style={styles.phoneBox}>
                    <Text style={{ ...styles.text, marginRight: scale(10) }}>МТС: {PHONE_NUMBER_MTS}</Text>
                    <Phone phoneNumber={PHONE_NUMBER_MTS} size="35" position="relative" />
                </View>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>На момент оформления заказа вам необходимо предоставить ваши контактные данные (Тел., ФИО, Адрес) и оплатить сумму в размере залога и арендной платы в зависимости от желаемого срока.</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>В случае необходимости забронировать товар оплачивается гарантийная сумма в размере 100 грн, которая не возвращается в случае отказа клиентом от заказа.</Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}><Text style={{ ...styles.text, fontWeight: 600 }}>ВАЖНО: </Text> Доставка оплачивается отдельно в обе стороны, как  за доставку на адрес заказчика, так и при возвращении товара по окончанию срока аренды.</Text>
            </View>
            <View style={{ ...styles.textBox, alignItems: "center" }}>

            </View>

        </ScrollView>
    )

}

const getStyles = (colors, width, height) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: scale(20)
        },
        textBox: {
            marginBottom: scale(20)
        },
        text: {
            fontSize: scale(14),
            color: colors.text,
            textAlign: 'justify',
            lineHeight: scale(20)
        },
        phoneBox: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
}

export default DeliveryScreen;