import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import Collapsible from 'react-native-collapsible'
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

export default function Customers() {

    const [items, setItems] = useState([]);
    const [listenCheck, setListenCheck] = useState(true);
    const [collapsed, setCollapsed] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedItems, setSearchedItems] = useState([])
    const [searchedColl, setSearchedColl] = useState([])

    Firebase.database().ref('Customers/').on('value', (data) => {
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
                setSearchedItems(temp);
                setSearchedColl(coll);
                setCollapsed(coll);
                setListenCheck(false);
            }
        }
    });

    const performSearch = (text) => {
        var filter = [];
        var status = [];
        if (text.length == 0 || text === '') {
            filter = items;
            status = collapsed;
        } else {
            items.map(item => {
                if(item.firstName != null && item.lastName != null){
                    if ((item.firstName.toLowerCase()).includes(text.toLowerCase()) || (item.lastName.toLowerCase()).includes(text.toLowerCase())) {
                        filter.push(item);
                        status.push(collapsed[items.indexOf(item)])
                    }
                }
            })
        }
        setSearchedItems(filter);
        setSearchedColl(status);
    }

    const pressHandler = (index) => {
        let status = [...searchedColl];
        status.splice(index, 1, !status[index])
        setSearchedColl(status)
        let final = [...collapsed]
        let ind = items.findIndex(item => item.id === searchedItems[index].id)
        final.splice(ind, 1, !final[ind])
        setCollapsed(final);
    }

    return (
        <View style={styles.main}>

            <StatusBar style='light' />
            <SearchBar
                placeholder="Search by Name"
                inputContainerStyle={{ height: 30 }}
                onChangeText={(text) => { setSearchText(text), performSearch(text) }}
                value={searchText}
            />
            <FlatList data={searchedItems} renderItem={({ item, index }) =>
            (<Card>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => pressHandler(index)}>
                    <Text style={{ color: 'black', fontSize: 16 }}>{"Customer ID : " + item.id}</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>Customer Name : {item.firstName ? item.firstName + " " + (item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                    <Collapsible collapsed={searchedColl[index]} >
                        <Text style={{ color: 'black', fontSize: 16 }}>Customer Mobile No. : {item.mobile ? item.mobile : "No number provided"}</Text>
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
