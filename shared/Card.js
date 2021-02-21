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
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        flex: 1,
        backgroundColor: '#778899',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DCDCDC',
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