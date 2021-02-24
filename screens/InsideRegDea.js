import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Firebase from '../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

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
                var allItems = [];
                var key = 'DealerProducts';
                if (data.val()[key]) {
                    for (var i = 0; i < data.val()[key].length; i++) {
                        allItems.push(data.val()[key][i]);
                    }
                }
                setItems(allItems)
            }
            setDealerCall(false);
            setLoader(false);
        }
    })

    return (

        <ScrollView style={styles.main}>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Dealer Id : " + (dealer.id ? dealer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Name : " + (dealer.firstName ? dealer.firstName + " " + (dealer.lastName ? dealer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Email : " + (dealer.email ? dealer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Mobile No. : " + (dealer.mobile ? dealer.mobile : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"City : " + (dealer.city ? dealer.city : "Not provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Bank Account No. : " + (dealer.AccountNumber ? dealer.AccountNumber : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Bank IFSC Code : " + (dealer.IfscCode ? dealer.IfscCode : "Not Provided")}</Text>

            <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={items} renderItem={({ item }) =>
                (
                    <View style={styles.card}>

                        <SliderBox
                            images={item.images}
                            autoplay={true}
                            sliderBoxHeight={175}
                            circleLoop={true}
                            resizeMode={'contain'}
                        />
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Product Id : {item.key}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Product Name : {item.productName}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Price : {item.productPrice}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Category : {item.category}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Stocks : {item.stocks}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Description : {item.description}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Specs : {item.specs}</Text>
                        <Text style={{ color: 'black', fontSize: 15, letterSpacing: 0.5 }}>Date : {item.productDate}</Text>
                    </View>

                )}>

                </FlatList>

            </SafeAreaView>
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

const styles = StyleSheet.create({
    main: {
        padding: 10,
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca'
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