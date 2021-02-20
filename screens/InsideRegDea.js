import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Alert, Modal, TextInput, Button, ActivityIndicator } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Firebase from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

export default function DealerItems(props) {

    const [dealerCall, setDealerCall] = useState(true);
    const [dealer, setDealer] = useState([]);
    const [items, setItems] = useState([]);
    var id = props.route.params.id;
    const [loader, setLoader] = useState(true);


    Firebase.database().ref(`Dealers/${id}`).once('value', (data) => {
        if (dealerCall) {
            if (data.val()) {
                setDealer(data.val());
                var keys = Object.keys(data.val())
                var key = keys[0];
                var allItems = [];
                for (var i = 0; i < data.val()[key].length; i++) {
                    allItems.push(data.val()[key][i]);
                    
                } 
                
                setItems(allItems)
            }
            console.log('items',items)
            setDealerCall(false);
            setLoader(false);
        }
    })

    return (

        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Dealer Id : " + (dealer.id ? dealer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Name : " + (dealer.firstName ? dealer.firstName + " " + (dealer.lastName ? dealer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Email : " + (dealer.email ? dealer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Mobile No. :" + (dealer.mobile ? dealer.mobile : "")}</Text>

            <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={items} renderItem={({ item }) =>
                (<View style={styles.card}>

                    <SliderBox
                        images={item.images}
                        autoplay={true}
                        sliderBoxHeight={175}
                        circleLoop={true}
                        resizeMode={'contain'}
                    />
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Product Name : {item.productName}</Text>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Price : {item.productPrice}</Text>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Category : {item.category}</Text>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Stocks : {item.stocks}</Text>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Description : {item.description}</Text>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Specs : {item.specs}</Text>
                    <View style={{ flexDirection: 'row', width: '100%' }}
                    >

                    </View>
                </View>

                )}>

                </FlatList>

            </SafeAreaView>
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
    card: {
        marginTop: 8,
        borderRadius: 6,
        elevation: 3,
        flex: 1,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardModalScreen: {
        height: 300,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    modalTextInput: {
        width: '90%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
});