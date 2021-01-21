import React, { useState } from "react";
import { StyleSheet, View, } from "react-native";


export default function card(props) {
    //console.log("vghvghvgh",props);
    return (

        <View style={styles.card}>
            <View style={styles.cardItems}>
                { props.children } 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        height: 80,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,

    },
    cardItems: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        alignItems: 'center',
    }
})