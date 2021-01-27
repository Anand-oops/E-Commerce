import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import Collapsible from 'react-native-collapsible'

export default function Customers() {

    const [items, setItems] = useState([]);

    const [listenCheck, setListenCheck] = useState(true);
    const [collapsed, setCollapsed] = useState([])

    const status = [];

    Firebase.database().ref('Customers/').on('value',(data) => {
        if (listenCheck) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = []
                var coll = []
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                    coll.push(true)
                }
                setItems(temp);
                setCollapsed(coll);
                status = coll;
                console.log("Status",status)
                setListenCheck(false);
            }
        }
    });

    const pressHandler = (index) => {
        //let status = collapsed;
        console.log("Status",status)
        console.log("Pressed",collapsed)
        //status.splice(index,1,!status[index])
        status
        //setCollapsed(status)
    }

    return (
        <View style={styles.main}>

            <FlatList data={items} extraData={collapsed} renderItem={({ item, index }) =>
            (<Card>
                <TouchableOpacity style={{flex:1}} onPress={() => pressHandler(index)}>
                <Text style={{ color: 'black', fontSize: 16 }}>{"Customer ID : " + item.id}</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>Customer Name : {item.firstName ?  item.firstName +" "+(item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                <Collapsible collapsed={collapsed[index]} >
                    <Text style={{ color: 'black', fontSize: 16 }}>Customer Mobile No. : {item.mobile ?  item.mobile : "No number provided"}</Text>
                </Collapsible>
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
