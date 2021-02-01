import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Alert, Modal, TextInput, Button } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Firebase from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

export default function PendingListScreen({ navigation }) {

    const [dealerCall, setDealerCall] = useState(true);
    const [dealer, setDealer] = useState([]);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [adminPrice, setAdminPrice] = useState()
    const [discountRate, setDiscountRate] = useState()
    const [product, setProduct] = useState()
    const [itemIndex, setItemIndex] = useState(-1)
    var id = navigation.getParam('id');
    

    Firebase.database().ref(`Dealers/${id}`).once('value').then((data) => {
        if (dealerCall) {
            if (data.val()) {
                setDealer(data.val());
                var keys = Object.keys(data.val())
                var key = keys[0];
                var filtered = [];
                var allItems = [];
                for(var i=0;i<data.val()[key].length;i++){
                    allItems.push(data.val()[key][i]);
                    if(data.val()[key][i].status==='Pending'){
                        filtered.push(data.val()[key][i]);
                    }
                }if (filtered.length==0) {
                    Firebase.database().ref(`Dealers/${id}/pendingStatus`).set(false)
                    .then(navigation.goBack())
                }
                setFilteredItems(filtered)
                setItems(allItems)
                setDealerCall(false);

            }
        }
    })



    const acceptProduct = (item) => {
        var index = -1;
        items.map((i) => {
            if (i.key==item.key) {
                index = items.indexOf(i);
            }
        })
        console.log("IndexAdd",index)
        Alert.alert('Accept Product', 'Are you sure you want to add this product to the inventory list?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'Proceed',

            onPress: () => {
                setItemIndex(index)
                setProduct(item)
                setShowModal(true)
                setAdminPrice(item.productPrice)
            }
        }]);
    }

    function deleteProduct(item) {
        var index = -1;
        items.map((i) => {
            if (i.key==item.key) {
                index = items.indexOf(i);
            }
        })
        console.log("IndexDel",index)
        Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                Firebase.database().ref(`Dealers/${id}/DealerProducts/${index}`).update({ status: 'Rejected' });
                Toast.show("Product Rejected",Toast.SHORT)
                setDealerCall(true);
            }
        }]);
    };

    function addProduct() {
        product.productPrice = adminPrice;
        var finalPrice = adminPrice - (adminPrice * discountRate) / 100;
        var temp = product;
        temp.status = "Accepted"
        temp.finalPrice = finalPrice;
        temp.discount = discountRate+" %";
        Firebase.database().ref(`ProductList/${temp.category}/${temp.key}`).set(temp).then(() => {
            Firebase.database().ref(`Dealers/${id}/DealerProducts/${itemIndex}`).update({ status: 'Accepted' });
            Toast.show("Product Accepted",Toast.SHORT)
            setDealerCall(true);  
        }).catch((error) => {
            console.log(error);
        });

        setShowModal(false);
        setDiscountRate('')
    }

    return (

        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Dealer Id : " + (dealer.id ? dealer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Name : " + (dealer.firstName ?  dealer.firstName +" "+(dealer.lastName ? dealer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Email : " + (dealer.email ? dealer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Mobile No. :" + (dealer.mobile ? dealer.mobile : "")}</Text>

            <SafeAreaView style={{flex:1}}>
                <FlatList data={filteredItems} renderItem={({ item }) =>
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
                        <View style={styles.card}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => deleteProduct(item)}>
                                <Text style={{ fontSize: 24, paddingLeft: 5 }}>Discard</Text>
                                <AntDesign name="close" size={34} color="red" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => acceptProduct(item)}>
                                <Text style={{ fontSize: 24, paddingLeft: 5 }}>Accept</Text>
                                <AntDesign name="check" size={34} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                )}>

                </FlatList>
    
                <Modal
                    visible={showModal}
                    position='center'
                    transparent={true}
                    onRequestClose={() => setShowModal(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.cardModalScreen}>
                            <Text style={{paddingLeft: 15,marginTop: 10}}>Enter Product Price:</Text>
                            <View style={{alignItems: 'center',justifyContent: 'center'}}>
                                <TextInput style={styles.modalTextInput} keyboardType={'number-pad'} onChangeText={(price) => setAdminPrice(price)} value={adminPrice} />
                            </View>
                            <Text style={{paddingLeft: 15,marginTop: 10}}>Enter Product Discount Percentage:</Text>
                            <View style={{alignItems: 'center',justifyContent: 'center'}}>
                                <TextInput style={styles.modalTextInput} keyboardType={'number-pad'} onChangeText={(discount) => setDiscountRate(discount)} value={discountRate} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={{padding: 10,width: '30%'}}>
                                    <Button title='Cancel' style={styles.modalButton} onPress={() => setShowModal(false)} />
                                </View>
                                <View style={{padding: 10,width: '30%'}}>
                                    <Button title='OK' onPress={() => {
                                        if (adminPrice.size != 0 && parseFloat(discountRate) >= 0 && parseFloat(discountRate) < 100) {
                                            addProduct()
                                        } else Toast.show("Enter valid valued", Toast.SHORT);
                                    }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>

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