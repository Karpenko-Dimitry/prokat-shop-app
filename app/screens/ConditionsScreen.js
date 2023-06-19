import React from "react";
import { Linking, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import { PHONE_NUMBER_KS, PHONE_NUMBER_MTS } from "../../env";

import Phone from "../components/Phone"

const ConditionsScreen = () => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const styles = getStyles(colors, width, height);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textBox}>
                <Text style={{ ...styles.text }}>
                    Оформления заказа осуществляется через форму заказа или по телефонам
                </Text>
                <View style={styles.phoneBox}>
                    <Text style={{ ...styles.text, marginRight: scale(10) }}>Киевстар: {PHONE_NUMBER_KS}</Text>
                    <Phone phoneNumber={PHONE_NUMBER_KS} width={20} position="relative" />
                </View>
                <View style={styles.phoneBox}>
                    <Text style={{ ...styles.text, marginRight: scale(10) }}>МТС: {PHONE_NUMBER_MTS}</Text>
                    <Phone phoneNumber={PHONE_NUMBER_MTS} width={20} position="relative" />
                </View>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>
                    На момент оформления заказа вам необходимо предоставить ваши контактные данные (Тел., ФИО, Адрес) и оплатить сумму в размере залога и арендной платы в зависимости от желаемого срока.
                </Text>

            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>
                    ЗАЛОГ возвращается по окончанию срока аренды и является гарантийной суммой, которая покрывает стоимость ремонта поврежденного товара по вине заказчика, и не покрывает затрат на приобретение нового.
                </Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>
                    В случае необходимости забронировать товар оплачивается гарантийная сумма в размере 100 грн, которая не возвращается в случае отказа клиентом от заказа
                </Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>
                    В случае возврата товара с трудновыводимыми пятнами и повреждениями неестественного износа взымается штраф в размере стоимости химчистки/ремонта (от 100 грн.).
                </Text>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.text}>
                    Просим Вас относиться к арендованному товару аккуратно и бережно, что будет гарантией возврата залоговой суммы в полном размере.
                </Text>
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

export default ConditionsScreen;