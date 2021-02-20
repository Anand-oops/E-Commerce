import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity, Alert,ActivityIndicator,StatusBar } from 'react-native';
import { useState, useContext, useRef } from 'react';
import Firebase from "../firebaseConfig";
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet'
import { CheckBox } from 'react-native-elements';
import { windowWidth } from '../shared/Dimensions'


const Tab = createMaterialTopTabNavigator();
const WishList=(props)=>{
    
	
	console.log("props", props);
    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    const [loader,setLoader]=useState(true);

    Firebase.database().ref(`Customers/${props.route.params.id}`).on('value', (data) => {
        if (listen) {
            if (data.val().wishlist) {
                var temp = [];
                var keys = Object.keys(data.val().wishlist);
                console.log('keys', keys);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val().wishlist[key])
                }
                setItem(temp);
            }
            
            setListen(false);
            setLoader(false);
        }

    })
   
    return (
        <ScrollView>
            <View style={styles.main}>

                <FlatList style={{ flex: 1, padding: 4 }}
                    data={items}
                    numColumns={2}
                    renderItem={({ item }) => (

                        <View style={{ flex: 1, margin: 2 }}>
                            <TouchableOpacity >
                                <View style={{ margin: 4}}>
                                    <View >
                                        <Image
                                            style={{ padding: 2, height: 200, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                                            source={{ uri: item.image.uri }}
                                        />
                                    </View>
                                    <Text style={{ color: '#3b3a30', fontSize: 20, paddingLeft: 4, textTransform: 'capitalize' }}>{item.productName}</Text>
                                    <Text style={{ color: 'black', fontSize: 12, padding: 4 }}>{item.category+" : "+item.subCategory}</Text>
                                    <Text style={{ color: 'black', fontSize: 10, paddingLeft: 4 }}>{item.description}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'grey', fontSize: 15, paddingLeft: 2 }}>{"₹" + item.finalPrice}</Text>
                                        <Text style={{ color: 'grey', fontSize: 15, paddingLeft: 2, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                                        <Text style={{ color: '#82b74b', fontSize: 15, paddingLeft: 2 }}>{"(" + item.discount + "off )"}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        </View>
                    )}>


                </FlatList>

                <View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
                <ActivityIndicator

                    size='large'
                    color="grey"
                    animating={loader}

                />
            </View>
            </View>

        </ScrollView>
    );
}
const Orders=(props)=>{
    

    const [listen, setListen] = useState(true);
    const [orders, setOrders] = useState([])
    const [loader, setLoader] = useState(true);

    Firebase.database().ref(`Customers/${props.route.params.id}/Orders`).on('value', data => {
        if (listen) {
            if (data.val()) {
                var list = [];
                var keys = Object.keys(data.val())
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    list.push(data.val()[key])
                }
                setOrders(list.reverse());
            } else
                Toast.show("No Orders", Toast.SHORT);
            setListen(false);
            setLoader(false);
        }
    });


    return (

        <View style={styles.main}>
            <StatusBar style='light' />
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <FlatList data={orders}
                    renderItem={data => (
                        <TouchableOpacity >
                            <View style={styles.listContainer}>
                                <Image source={data.item.image} style={styles.listimage} />
                                <View style={styles.list}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Order Id: {data.item.orderId}</Text>
                                    <Text style={{ color: 'blue' }}>Order Date: {data.item.orderDate}</Text>
                                    <Text style={{ color: 'black' }}>Product : {data.item.productName}</Text>
                                    <Text style={{ color: 'purple' }}>Category : {data.item.category} :: {data.item.subCategory}</Text>
                                    <Text style={{ color: 'blue' }}>Price: {data.item.finalPrice}</Text>
                                    <Text style={{ color: 'black' }}>Delivered: {data.item.address.city + "," + data.item.address.state + " - " + data.item.address.pincode}</Text>
                                    <Text style={{ color: 'red', marginBottom: 5 }}>{data.item.deliveryStatus}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} />
            </ScrollView>
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


const InsideRegCusTabNav=(props)=>{
	console.log('user',props.route.params.id);
    return (
		
		<Tab.Navigator
			lazy={true}
			tabBarOptions={{
				activeTintColor: 'white',
				labelStyle: { fontSize: 10 },
				style: { backgroundColor: 'black', elevation: 5 },
			}}
		>
			<Tab.Screen
				name="Wishlist"
				component={WishList}
				options={{ tabBarLabel: 'Wishlist' }}
				initialParams={{id:props.route.params.id}}
			/>

			<Tab.Screen
				name="Orders"
				component={Orders}
				options={{ tabBarLabel: 'Orders' }}
				initialParams={{id:props.route.params.id}}
			/>

		</Tab.Navigator>
		
	);
}

export default InsideRegCusTabNav;


// const Stack = createStackNavigator();

// export default function InsideRegCus({ navigation }) {
//     return (
//         <View style={{flex:1}}>
//             <Text>Insider</Text>
//         </View>
//     )

// }




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
    text: {
        color: 'blue'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        paddingHorizontal: 20,
        marginTop: 5
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 20,
    },
    filterButton: {
        width: windowWidth / 2,
        textAlign: 'center',
        color: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 15,
        elevation: 10,
    }
});