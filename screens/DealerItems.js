import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function PendingListScreen({ navigation }) {


    const [dealerCall, setDealerCall] = useState(true);
    const [dealer, setDealer] = useState([]);
    const [items, setItems] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [imagesDeck, setImagesDeck] = useState([]);
    const [allImages, setAllImages] = useState([]);
    var id = navigation.getParam('id');


    Firebase.database().ref(`Dealers/${id}`).once('value').then((data) => {
        if (dealerCall) {
            if (data.val()) {
                setDealer(data.val());
                var keys = Object.keys(data.val())
                var key = keys[0];
                setItems(data.val()[key])
                let productKeys = Object.keys(data.val()[key])
                for (let i = 0; i < productKeys.length; i++) {
                    var productKey = productKeys[i]
                    var images = data.val()[key][productKey].images;
                    setImagesDeck(images);
                    // var imagesKey = Object.keys(image)
                    // for (let index = 0; index < imagesKey.length; index++) {
                    //     var pKey = imagesKey[i];
                    //     console.log("PImage",pKey)
                    // }
                    // console.log(imagesKey)
                    //console.log(productKey,data.val()[key][productKey].images.url)
                    //setDummy(data.val()[key][productKey].images);
                    //setImagesDeck([...imagesDeck, data.val()[key][productKey].images.url ])
                    //setAllImages([...allImages,data.val()[key][productKey].images ])
                }
                setDealerCall(false);
            }
        }
    })
   

    // for (var i = 0; i < items.length; i++) {
    //     Firebase.database().ref(`Dealers/${id}/DealerProducts/${i}/images/`).once('value').then((data) => {

    //         setImages(data.val());
    //         setAllImages([...allImages, { imagesDeck }])
    //         // console.log("Items", imagesDeck);
    //         // console.log("All images",allImages);
    //     })
    // }



    // Firebase.database().ref(`Dealers/${id}/DealerProducts/0/images/`).once('value').then((data) => {
        
    //     if (data.val()) {
    //         console.log("Data",data.val());
    //     }

    // })



    return (

        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Dealer Id : " + dealer.id}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Name : " + dealer.firstName + " " + dealer.lastName}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Email : " + dealer.email}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Mobile No. :" + dealer.mobile}</Text>

            <FlatList data={items} renderItem={({ item }) =>
            (<View style={styles.card}>
                <SliderBox
                    images={imagesDeck}
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
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={styles.card}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 24, paddingLeft: 5 }}>Discard</Text>
                            <AntDesign name="close" size={34} color="red" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 24, paddingLeft: 5 }}>Accept</Text>
                            <AntDesign name="check" size={34} color="green" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            )}>

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
        // justifyContent: "center",
        paddingTop: '50%'
    },
    card: {
        marginTop: 8,
        // height:80,
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
    }
});