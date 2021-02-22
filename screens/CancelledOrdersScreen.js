import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator ,Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CancelledOrders({ }) {

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
                    console.log(items)
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (data.val()[key][item].deliveryStatus === 'Cancelled : Pending' || data.val()[key][item].deliveryStatus === 'Cancelled : Accepted'
                                || data.val()[key][item].deliveryStatus === 'Cancelled : Rejected') {
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
                Toast.show("No Cancelled Products", Toast.SHORT);
            setListen(false)
            setLoader(false);
        }
    })

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
        let ind = orders.findIndex(item => item.orderId === filtered[index].orderId)
        final.splice(ind, 1, !final[ind])
        setCollapsed(final);
    }
    const acceptCancel=(item)=>{
        var notif="You cancel request is accepted for the product: "+ item.productName +" having id: "+item.orderId;
          Firebase.database().ref(`Customers/${item.customer.customerId}/Notifications`).push(notif);
          Firebase.database().ref(`Customers/${item.customer.customerId}/Orders/${item.orderId}`).update({ deliveryStatus: 'Cancelled : Accepted' });
          Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).update({ deliveryStatus: 'Cancelled : Accepted' });  
          Toast.show("Product Accepted", Toast.SHORT)
    }
    const rejectCancel=(item)=>{
        var notif="You cancel request is rejected for the product: "+ item.productName +" having id: "+item.orderId;
        Firebase.database().ref(`Customers/${item.customer.customerId}/Notifications`).push(notif);
        Firebase.database().ref(`Customers/${item.customer.customerId}/Orders/${item.orderId}`).update({ deliveryStatus: 'Cancelled : Rejected' });
        Firebase.database().ref(`CustomerOrders/${item.dealerId}/${item.orderId}`).update({ deliveryStatus: 'Cancelled : Rejected' });    
        Toast.show("Product Rejected", Toast.SHORT)
    }

    const onChange = (event, selectedDate) => {
        setShow(false)
        setSearchText('');
        setSearchBy('order');
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
                        <View >
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5 }}>Order Id: {data.item.orderId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Id: {data.item.customer.customerId}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Name : {(data.item.customer.customerName != 'undefined undefined') ? data.item.customer.customerName : "No name provided"}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Order Date: {data.item.orderDate}</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Reason: {data.item.reason}</Text>
                            <Collapsible collapsed={searchedColl[data.index]}>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Product : {data.item.productName}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Price: {data.item.finalPrice}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5}}>Delivered At: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{flex:1,elevation:1,borderRadius:1,padding:4,margin:2,backgroundColor:'pink'}} onPress={()=>{
                                        Alert.alert("Accept", "Are you sure?",
                                        [
                                            { text: "Cancel" },
                                            { text: "Proceed", onPress: () => acceptCancel(data.item) }
                                        ], { cancelable: false }
                                    );
                                    }
                                        }>
                                        <Text style={{fontWeight:'bold',alignSelf:'center'}}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:1,elevation:1,borderRadius:1,padding:4,backgroundColor:'pink',margin:2}} onPress={()=>{
                                        Alert.alert("Reject", "Are you sure?",
                                        [
                                            { text: "Cancel" },
                                            { text: "Proceed", onPress: () => rejectCancel(data.item) }
                                        ], { cancelable: false }
                                    );
                                    }
                                        }>
                                        <Text style={{fontWeight:'bold',alignSelf:'center'}}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
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
        backgroundColor:'#a6b8ca'
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