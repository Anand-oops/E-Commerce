import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';

export default function Dealers() {

    const [items, setItems] = useState([]);

    const [listenCheck, setListenCheck] = useState(true);
    
    const pressHandler = () => {
        console.log("clicked");
    }

    Firebase.database().ref('Dealers/').on('value',(data) => {
        if (listenCheck) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = []
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }
                setItems(temp);
                setListenCheck(false);
            }
        }
    });

    return (
        <View style={styles.main}>

            <FlatList data={items} keyExtractor={(item) => item.id} renderItem={({ item }) =>
            (<Card>
                <TouchableOpacity style={{flex:1}} onPress={() => pressHandler()}>
                <Text style={{ color: 'black', fontSize: 16 }}>{"Dealer ID : " + item.id}</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>Dealer Name : {item.firstName ?  item.firstName +" "+(item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                </TouchableOpacity>
            </Card>)}>

            </FlatList>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: '50%'
    },
});
