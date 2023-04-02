import React  from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import { images } from "../../assets/images/images";
import { APP_NAME } from "../../env";
import { companyColor } from "../services/ColorService";

const WellcomeScreen = ({ navigation }) => {
    const styles = getStyles();

    return (
        <View style={styles.container}>
            <View>
                <Image source={images.logo} style={styles.logoImg} />
            </View>
            <View>
                <Text style={styles.appNameText}>{ APP_NAME }</Text>
            </View>
        </View>
    )
}

const getStyles = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        logoImg: {
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20
        },
        appNameText: {
            padding: 20,
            fontSize: 40,
            color: companyColor 
        }
    });
}

export default WellcomeScreen;