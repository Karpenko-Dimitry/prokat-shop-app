import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet, Text, Dimensions } from "react-native";
import { scale } from "../services/HelperService";

const Banner = ({ images, width, height }) => {
    const [page, setPage] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);

        if (slide !== page) {
            setPage(slide)
        }
    }

    width = width || Dimensions.get('window').width;
    height = height || (width * 0.6);

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            width: width,
            height: height,
            borderRadius: scale(7)
        },
        image: {
            width: width,
            height: height,
            resizeMode: 'contain',
            borderRadius: scale(7)
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            position: "absolute",
            bottom: 0,
        },
        page: {
            fontSize: scale(15),
            paddingRight: scale(10),
            color: '#c5c5c5'
        },
        activePage: {
            fontSize: scale(15),
            paddingRight: scale(10),
            color: "#808080"
        }

    })

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={change}
                showsHorizontalScrollIndicator={false}
            >
                {
                    images.map((image, index) => (<Image style={styles.image} key={image.id} source={{ uri: image.src }} />))
                }
            </ScrollView>
            <View style={styles.paginationContainer}>
                {
                    images.map((image, index) => (<Text key={image.id} style={index === page ? styles.activePage : styles.page}>⬤</Text>))
                }

            </View>
        </View>
    )

}



export default Banner;