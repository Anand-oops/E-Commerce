import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';

export default function PendingOrders() {

    const [searchText, setSearchText] = useState('')

    const performSearch = (text) => {
        console.log("Search", text);
    }

    return (
        <View style={styles.main}>
            <StatusBar style='light' />
            <SearchBar
                placeholder="Search "
                inputContainerStyle={{ height: 30 }}
                onChangeText={(text) => { setSearchText(text), performSearch(text) }}
                value={searchText}
            />
            <ScrollView>
                
            </ScrollView>
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
        paddingTop:'50%'
    },
});