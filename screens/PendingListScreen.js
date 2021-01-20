import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import Card from "../shared/Card";
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';

export default function PendingListScreen({ navigation }) {

    const pressHandler = (item) => {
        console.log("clicked");
        navigation.navigate('DealerItems', { id: item.id });
    }
    const [items, setItems] = useState([]);

    const [listenCheck, setListenCheck] = useState(true);
    Firebase.database().ref('Dealers/').once('value').then((data) => {
        if (listenCheck) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    setItems([...items, data.val()[key]])
                }
                setListenCheck(false);
            }
        }
    })
    return (

        <View style={styles.main}>

            <FlatList data={items} renderItem={({ item }) =>
            (<Card>
                <View styles={{flex:1}}>
                <Text style={{ color: 'black', fontSize: 16 }}>{"Dealer ID : " + item.id}</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>Dealer Name : {item.firstName ?  item.firstName +" "+(item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                
                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                    onPress={item.pendingStatus ? () => pressHandler(item) : () => {Toast.show("No Pending Products",Toast.SHORT)}}>
                    <AntDesign name="doubleright" size={30} color={item.pendingStatus ? 'red' : 'black'} />
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
        // justifyContent: "center",
        paddingTop: '50%'
    },
});
