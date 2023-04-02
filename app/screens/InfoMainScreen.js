import React from "react";
import { Linking, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { companyColor } from "../services/ColorService";
import { useTheme } from "@react-navigation/native";
import { scale } from "../services/HelperService";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Phone from "../components/Phone"

const InfoMainScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const styles = getStyles(colors, width, height);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contacts')}>
                    <Text style={styles.menuItemText}>Контакты</Text> 
                    <Ionicons style={styles.menuItemText} name="md-arrow-forward" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Conditions')}>
                    <Text style={styles.menuItemText}>Условия проката</Text> 
                    <Ionicons style={styles.menuItemText} name="md-arrow-forward" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Delivery')}>
                    <Text style={styles.menuItemText}>Доставка и оплата</Text> 
                    <Ionicons style={styles.menuItemText} name="md-arrow-forward" />
                </TouchableOpacity>
            </View>
            <Phone />
        </View>
    )

}

const getStyles = (colors, width, height) => {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        menuItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scale(15),
            paddingVertical: scale(20),
            borderBottomWidth: scale(1),
            borderBottomColor: colors.border
        },
        menuItemText: {
            color: colors.text,
            fontSize: scale(16)
        },
        menuItemArrow: {
            color: colors.text,
            fontSize: scale(16)
        }
    })
}

export default InfoMainScreen;