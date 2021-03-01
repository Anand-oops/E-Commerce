import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { useState } from 'react';
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';

const Tab = createMaterialTopTabNavigator();

const WishList = (props) => {

    const [listen, setListen] = useState(true);
    const [customer, setCustomer] = useState([])
    const [items, setItem] = useState([]);
    const [loader, setLoader] = useState(true);

    Firebase.database().ref(`Customers/${props.route.params.id}`).on('value', (data) => {
        if (listen) {
            if (data.val()) {
                setCustomer(data.val())
            }
            if (data.val().wishlist) {
                var temp = [];
                var keys = Object.keys(data.val().wishlist);
                console.log('keys', keys);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val().wishlist[key])
                }
                setItem(temp);
            } else
                Toast.show("No Products in Wishlist", Toast.SHORT);
            setListen(false);
            setLoader(false);
        }

    })

    return (
        <ScrollView style={styles.main}>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Customer Id : " + (customer.id ? customer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Name : " + (customer.firstName ? customer.firstName + " " + (customer.lastName ? customer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Email : " + (customer.email ? customer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Mobile No. : " + (customer.mobile ? customer.mobile : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"City : " + (customer.city ? customer.city : "Not provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Bank Account No. : " + (customer.AccountNumber ? customer.AccountNumber : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Bank IFSC Code : " + (customer.IfscCode ? customer.IfscCode : "Not Provided")}</Text>

            <FlatList style={{ flex: 1 }}
                data={items}
                numColumns={2}
                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <View style={{ margin: 4 }}>
                            <View >
                                <Image
                                    style={{ padding: 2, height: 150, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                                    source={{ uri: item.image.uri }}
                                />
                            </View>
                            <Text style={{ color: '#3b3a30', fontSize: 14, paddingLeft: 4, textTransform: 'capitalize' }}>ID : {item.key}</Text>
                            <Text style={{ color: '#3b3a30', fontSize: 14, paddingLeft: 4, textTransform: 'capitalize' }}>Product : {item.productName}</Text>
                            <Text style={{ color: 'black', fontSize: 12, padding: 4 }}>{item.category + " : " + item.subCategory}</Text>
                            <Text style={{ color: 'black', fontSize: 12, paddingLeft: 4 }}>Description : {item.description}</Text>
                            <Text style={{ color: 'black', fontSize: 12, paddingLeft: 4 }}>Specs : {item.specs}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#3b3a30', fontSize: 13, paddingLeft: 4 }}>{"₹" + item.finalPrice}</Text>
                                <Text style={{ color: '#3b3a30', fontSize: 13, paddingLeft: 10, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                                <Text style={{ color: 'green', fontSize: 13, paddingLeft: 10 }}>{"(" + item.discount + "off )"}</Text>
                            </View>

                        </View>


                    </View>
                )}>


            </FlatList>

            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="#000a1a"
                    animating={loader}

                />
            </View>
        </ScrollView>
    );
}
const Orders = (props) => {


    const [listen, setListen] = useState(true);
    const [orders, setOrders] = useState([])
    const [loader, setLoader] = useState(true);
    const [customer, setCustomer] = useState([])

    Firebase.database().ref(`Customers/${props.route.params.id}`).on('value', data => {
        if (listen) {
            if (data.val()) {
                setCustomer(data.val())
            }
            if (data.val().Orders) {
                var list = [];
                var keys = Object.keys(data.val().Orders)
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    list.push(data.val().Orders[key])
                }
                setOrders(list.reverse());
            } else
                Toast.show("No Orders", Toast.SHORT);
            setListen(false);
            setLoader(false);
        }
    });


    return (

        <ScrollView style={styles.main}>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Customer Id : " + (customer.id ? customer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Name : " + (customer.firstName ? customer.firstName + " " + (customer.lastName ? customer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Email : " + (customer.email ? customer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Mobile No. : " + (customer.mobile ? customer.mobile : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"City : " + (customer.city ? customer.city : "Not provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Bank Account No. : " + (customer.AccountNumber ? customer.AccountNumber : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1, letterSpacing: 0.5 }}>{"Bank IFSC Code : " + (customer.IfscCode ? customer.IfscCode : "Not Provided")}</Text>
            <StatusBar style='light' />
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <FlatList data={orders}
                    keyExtractor={(data) => { data.orderId }}
                    renderItem={data => (
                        <View style={styles.listContainer}>
                            <Image source={data.item.image} style={styles.listimage} />
                            <View style={{flex:1}}>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Order Id: {data.item.orderId}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Order Date: {data.item.orderDate}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Product : {data.item.productName}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Price : {data.item.finalPrice}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 0.5 }}>Delivered : {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 0.5 }}>Status : {data.item.deliveryStatus}</Text>
                            </View>
                        </View>
                    )} />
            </ScrollView>
            <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="#000a1a"
                    animating={loader}

                />
            </View>
        </ScrollView>
    );
}


const InsideRegCusTabNav = (props) => {
    console.log('user', props.route.params.id);
    return (

        <Tab.Navigator
            lazy={true}
            tabBarOptions={{
                activeTintColor: 'white',
                labelStyle: { fontSize: 10 },
                style: { backgroundColor: '#223240', elevation: 5 },
            }}
        >
            <Tab.Screen
                name="Wishlist"
                component={WishList}
                options={{ tabBarLabel: 'Wishlist' }}
                initialParams={{ id: props.route.params.id }}
            />

            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{ tabBarLabel: 'Orders' }}
                initialParams={{ id: props.route.params.id }}
            />

        </Tab.Navigator>

    );
}

export default InsideRegCusTabNav;


const styles = StyleSheet.create({
    main: {
        padding: 10,
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca',
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000a1a',
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        flex: 1,
        backgroundColor: '#778899',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DCDCDC',
        marginVertical: 6,
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 20,
    },
    card: {
        marginTop: 8,
        padding: 5,
        borderRadius: 10,
        elevation: 3,
        flex: 1,
        backgroundColor: '#778899',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: '#DCDCDC',
        marginHorizontal: 4,
        marginVertical: 6,
    },
});