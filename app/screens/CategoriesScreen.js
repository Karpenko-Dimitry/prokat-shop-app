import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import { scale } from "../services/HelperService";

const CategoriesScreen = ({ navigation, route }) => {
    const categories = useSelector(state => state.categoriesStore.categories);
    const { width } = Dimensions.get('window');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.categoriesContainer}>
                {categories.length > 0 && (
                    categories.map(category => (<Category key={category.id} navigation={navigation} category={category} width={width / 3 - scale(40)} />))
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoriesContainer: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default CategoriesScreen;