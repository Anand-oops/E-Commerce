import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DeliveredOrders({navigation}) {
console.log('del order',navigation);
    const [listen, setListen] = useState(true)
    const [orders, setOrders] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchText, setSearchText] = useState('')
    const [collapsed, setCollapsed] = useState([])
    const [searchedColl, setSearchedColl] = useState([])
    const [searchBy, setSearchBy] = useState('name');
    const [loader,setLoader]=useState(true);

    Firebase.database().ref(`CustomerOrders`).on('value', data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var coll = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var items = Object.keys(data.val()[key])
                    console.log(items)
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (data.val()[key][item].deliveryStatus === 'Delivered') {
                            list.push(data.val()[key][item])
                            coll.push(true)
                        }
                    }
                }
                setOrders(list);
                setFiltered(list);
                setCollapsed(coll);
                setSearchedColl(coll);
            } else
                Toast.show("No Delivered Products", Toast.SHORT);
            setListen(false)
            setLoader(false)
        }
    })

    const performSearch = (text) => {
        var filter = [];
        var status = [];
        if (text.length == 0 || text === '') {
            filter = orders;
            status = collapsed;
        } else {
            if (searchBy === 'order') {
                orders.map(item => {
                    if ((item.orderId).includes(text.toLowerCase())) {
                        filter.push(item);
                        status.push(collapsed[orders.indexOf(item)])
                    }
                })
            } else if (searchBy === 'dealer') {
                orders.map(item => {
                    if ((item.dealerId.toLowerCase()).includes(text.toLowerCase())) {
                        filter.push(item);
                        status.push(collapsed[orders.indexOf(item)])
                    }
                })
            }
            else {
                orders.map(item => {
                    if ((item.customer.customerId).includes(text.toLowerCase())) {
                        filter.push(item);
                        status.push(collapsed[orders.indexOf(item)])
                    }
                })
            }
        }
        setFiltered(filter);
        setSearchedColl(status);
    }

    const pressHandler = (index) => {
        let status = [...searchedColl];
        status.splice(index, 1, !status[index])
        setSearchedColl(status)
        let final = [...collapsed]
        let ind = orders.findIndex(item => item.id === filtered[index].id)
        final.splice(ind, 1, !final[ind])
        setCollapsed(final);
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
            <View style={{ flexDirection: 'row-reverse' }}>
                <DropDownPicker
                    items={[{ label: 'By Order Id', value: 'order' },
                    { label: 'By Customer Id', value: 'customer' },
                    { label: 'By Dealer Id', value: 'dealer' }]}
                    defaultValue="order"
                    containerStyle={{ height: 30, width: '50%' }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 5 }}
                    style={{ backgroundColor: 'white' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => {
                        setSearchBy(item.value), setSearchText(''), performSearch('')
                    }}
                />
            </View>

            <FlatList data={filtered}
                renderItem={(data) => (
                    <TouchableOpacity style={styles.listContainer} onPress={() => pressHandler(data.index)}>
                        <Image source={data.item.image} style={styles.listimage} />
                        <View >
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Order Id: {data.item.orderId}</Text>
                            <Text style={{ color: 'gray' }}>Dealer Id: {data.item.dealerId}</Text>
                            <Text style={{ color: 'gray' }}>Customer Id: {data.item.customer.customerId}</Text>
                            <Collapsible collapsed={searchedColl[data.index]}>
                                <Text style={{ color: 'black' }}>Product : {data.item.productName}</Text>
                                <Text style={{ color: 'purple' }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'blue' }}>Price: {data.item.finalPrice}</Text>
                                <Text style={{ color: 'black' }}>Delivered At: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                            </Collapsible>
                        </View>
                    </TouchableOpacity>
                )} />
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
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 10,
    },
});