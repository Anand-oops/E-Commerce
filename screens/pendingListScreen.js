import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PendingListScreen() {

    return (
        
        <View style={styles.main}>
                <Text style={ {color:'black'}}>this is pendingList Screen </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height:'100%',
        width:'100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop:'50%'
    },
});