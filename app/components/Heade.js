import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({params}) => {
    return (
        <View style={styles.container}>
            <Text>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        
    },
})

export default Header;