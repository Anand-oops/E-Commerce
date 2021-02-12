import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native';
import Card from "../shared/Card";
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';

export default function PendingListScreen({ navigation }) {

    const [items, setItems] = useState([]);
    const [loader,setLoader]=useState(true);

    const [listenCheck, setListenCheck] = useState(true);

    const pressHandler = (item) => {
        console.log("clicked");
        navigation.navigate('DealerItems', { id: item.id });
    }

    Firebase.database().ref('Dealers/').on('value', (data) => {
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
                setLoader(false);
            }
        }
    });

    return (
        <View style={styles.main}>

            <FlatList data={items} keyExtractor={(item) => item.id} renderItem={({ item }) =>
            (<Card>
                <View styles={{ flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 16, marginTop: 10, marginBottom: 5 }}>{"Dealer ID : " + item.id}</Text>
                    <Text style={{ color: 'black', fontSize: 16, marginBottom: 10 }}>Dealer Name : {item.firstName ? item.firstName + " " + (item.lastName ? item.lastName : " ") : "No name provided"}</Text>

                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                    onPress={item.pendingStatus ? () => pressHandler(item) : () => { Toast.show("No Pending Products", Toast.SHORT) }}>
                    <AntDesign name="doubleright" size={30} color={item.pendingStatus ? 'red' : 'black'} />
                </TouchableOpacity>

            </Card>)}>

            </FlatList>
            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="grey"
                    animating={loader}

                />
            </View>
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
