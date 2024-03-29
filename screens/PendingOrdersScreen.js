import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';

export default function PendingOrders({ }) {

    const [listen, setListen] = useState(true)
    const [orders, setOrders] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchText, setSearchText] = useState('')
    const [collapsed, setCollapsed] = useState([])
    const [searchedColl, setSearchedColl] = useState([])
    const [searchBy, setSearchBy] = useState('order')
    const [loader, setLoader] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [buttonText, setButtonText] = useState('Select Date')

    Firebase.database().ref(`CustomerOrders`).on('value', data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var coll = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var items = Object.keys(data.val()[key])
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (data.val()[key][item].deliveryStatus === 'Pending') {
                            list.push(data.val()[key][item])
                            coll.push(true)
                        }
                    }
                }
                setOrders(list.reverse());
                setFiltered(list.reverse());
                setCollapsed(coll);
                setSearchedColl(coll);
            } else
                Toast.show("No Pending Products", Toast.SHORT);
            setListen(false);
            setLoader(false);
        }
    })

    const changeStatus = (item) => {
        Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).update({ deliveryStatus: 'Delivered' });
        Firebase.database().ref(`Customers/${item.customer.customerId}/Orders/${item.orderId}`).update({ deliveryStatus: 'Delivered' });
        var notif = "Your order " + item.productName + " is delivered.";
        Firebase.database().ref(`Customers/${item.customer.customerId}/Notifications`).push(notif);
        setListen(true);
    }

    const performSearch = (text) => {
        setButtonText('Select Date')
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
                    if ((item.customer.customerId.toLowerCase()).includes(text.toLowerCase())) {
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
        let ind = orders.findIndex(item => item.orderId === filtered[index].orderId)
        final.splice(ind, 1, !final[ind])
        setCollapsed(final);
    }

    const onChange = (event, selectedDate) => {
        setShow(false)
        setSearchText('');
        setSearchBy('order')
        if (event.type === 'dismissed') {
            setSelectedDate(new Date());
            setButtonText('Select Date');
            setFiltered(orders);
            setCollapsed(collapsed);
        } else {
            setSelectedDate(selectedDate);
            var date = selectedDate.getDate() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getFullYear();
            setButtonText(date);
            var list = [];
            var coll = [];
            orders.map(item => {
                if (item.orderDate == date) {
                    list.push(item);
                    coll.push(collapsed[orders.indexOf(item)])
                }
            })
            setFiltered(list);
            setSearchedColl(coll);
        }
    }

    return (
        <View style={styles.main}>
            <StatusBar style='light' />
            <SearchBar
                placeholder="Search "
                keyboardType={(searchBy === 'order') ? 'number-pad' : 'default'}
                inputContainerStyle={{ height: 30 }}
                onChangeText={(text) => { setSearchText(text), performSearch(text) }}
                value={searchText}
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '50%', borderRadius: 10, borderWidth: 1, borderColor: 'white', padding: 2, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => { setShow(true) }} >
                    <Text style={{ color: 'black', textAlign: 'center' }}>{buttonText}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={selectedDate}
                        maximumDate={new Date()}
                        onChange={onChange}
                    />
                )}

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
                keyExtractor={(item) => item.orderId}
                renderItem={(data) => (
                    <TouchableOpacity style={styles.listContainer} onPress={() => pressHandler(data.index)}>
                        <Image source={data.item.image} style={styles.listimage} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Order Id: {data.item.orderId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Dealer Id: {data.item.dealerId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Customer Id: {data.item.customer.customerId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Order Date: {data.item.orderDate}</Text>
                            <Collapsible collapsed={searchedColl[data.index]}>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Product : {data.item.productName}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Price : {data.item.finalPrice}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Delivered At: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'space-around', marginTop: 5 }}
                                    onPress={() => {
                                        Alert.alert("Delivered ?", "Product will be marked Delivered !",
                                            [{ text: 'Cancel' },
                                            { text: 'Proceed', onPress: () => changeStatus(data.item) }])
                                    }}>
                                    <Text style={{ color: 'red' }}>Mark as Delivered</Text>
                                    <MaterialCommunityIcons style={{ marginLeft: 20 }} name="truck-delivery-outline" size={24} color="red" />
                                </TouchableOpacity>
                            </Collapsible>
                        </View>
                    </TouchableOpacity>
                )} />
            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="#000a1a"
                    animating={loader}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#000a1a',
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