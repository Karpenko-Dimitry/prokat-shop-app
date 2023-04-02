import React from "react";
import { Linking, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import { PHONE_NUMBER_KS, PHONE_NUMBER_MTS } from "../../env";

import Phone from "../components/Phone"
import Location from "../components/Location";

const ContactsScreen = () => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const styles = getStyles(colors, width, height);

    return (
        <ScrollView style={styles.container}>
            <View style={{...styles.textBox, alignItems: 'center'}}>
                <Text style={{ ...styles.text, textAlign: 'center' }}>
                    Одесса, р-н Таирова, ул. Рыбальская, 23/25 (угол ул. Долгая)
                </Text>
                <Location size="35" position="relative" />
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
                <View>
                    <Text style={{ ...styles.text, fontWeight: 600 }}>Прием, Выдача товара: </Text>
                </View>
                <View>
                    <Text style={styles.text}>Пн. — Пт.: с 12:00 до 18:30;</Text>
                </View>
                <View>
                    <Text style={styles.text}>Суб.-Воскр: Выходной</Text>
                </View>
            </View>
            <View style={styles.textBox}>
                <View>
                    <Text style={{ ...styles.text, fontWeight: 600 }}>Консультации по телефону: </Text>
                </View>
                <View>
                    <Text style={styles.text}>с 9-00 до 21-00; Без выходных</Text>
                </View>
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

export default ContactsScreen;