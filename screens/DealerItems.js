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
    const [filteredItems, setFilteredItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [adminPrice, setAdminPrice] = useState()
    const [discountRate, setDiscountRate] = useState()
    const [product, setProduct] = useState()
    const [dummy,setDummy]=useState();
    const [dummyIndex,setDummyIndex]=useState();
    const [itemIndex, setItemIndex] = useState(-1)
    const id = props.route.params.id;
    const [loader, setLoader] = useState(true);
    const [reason,setReason]=useState();


    Firebase.database().ref(`Dealers/${id}`).once('value', (data) => {
        if (dealerCall) {
            if (data.val()) {
                setDealer(data.val());
                var keys = Object.keys(data.val())
                var key = keys[0];
                var filtered = [];
                var allItems = [];
                for (var i = 0; i < data.val()[key].length; i++) {
                    allItems.push(data.val()[key][i]);
                    if (data.val()[key][i].status === 'Pending') {
                        filtered.push(data.val()[key][i]);
                    }
                } if (filtered.length == 0) {
                    Firebase.database().ref(`Dealers/${id}/pendingStatus`).set(false)
                        .then(props.navigation.goBack())
                }
                setFilteredItems(filtered)
                setItems(allItems)
            }
            setDealerCall(false);
            setLoader(false);
        }
    })



    const acceptProduct = (item) => {
        var index = -1;
        items.map((i) => {
            if (i.key == item.key) {
                index = items.indexOf(i);
            }
        })
        console.log("IndexAdd", index)
        Alert.alert('Accept Product', 'Are you sure you want to add this product to the inventory list?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'Proceed',

            onPress: () => {
                setItemIndex(index)
                setProduct(item)
                setShowModal(true)
                setAdminPrice(item.productPrice);
                

            }
        }]);
        
    }

    function deleteProduct(item) {
        var index = -1;
        items.map((i) => {
            if (i.key == item.key) {
                index = items.indexOf(i);
            }
        })
        console.log("IndexDel", index)
        Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                
                setDummyIndex(index);
                setDummy(item);
                setShowModal2(true);
                setDealerCall(true);
            }
        }]);
    };
    
    function addReason() {

        Firebase.database().ref(`Dealers/${id}/DealerProducts/${dummyIndex}`).update({ status: 'Rejected' });
                Toast.show("Product Rejected", Toast.SHORT)
        var text= "Product with id : " + id + " and product name : "+ dummy.productName+ " is rejected :- "+reason;
        Firebase.database().ref(`Dealers/${id}/Notifications`).push(text);
        setShowModal2(false);
    }
    function addProduct() {
        product.productPrice = adminPrice;
        var finalPrice = adminPrice - (adminPrice * discountRate) / 100;
        var temp = product;
        temp.status = "Accepted"
        temp.finalPrice = finalPrice;
        temp.discount = discountRate + " %";
        Firebase.database().ref(`ProductList/${temp.category}/${temp.subCategory}/${temp.key}`).set(temp).then(() => {
            Firebase.database().ref(`Dealers/${id}/DealerProducts/${itemIndex}`).update({ status: 'Accepted' });
            Toast.show("Product Accepted", Toast.SHORT)
            setDealerCall(true);
        }).catch((error) => {
            console.log(error);
        });

        var text= "Product with id : " + id+ " and product name : "+ product.productName + " is accepted."
                Firebase.database().ref(`Dealers/${id}/Notifications`).push(text);
        setShowModal(false);
        setDiscountRate('')
    }

    return (

        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Dealer Id : " + (dealer.id ? dealer.id : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Name : " + (dealer.firstName ? dealer.firstName + " " + (dealer.lastName ? dealer.lastName : " ") : "No name provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Email : " + (dealer.email ? dealer.email : "")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Mobile No. :" + (dealer.mobile ? dealer.mobile : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"City :" + (dealer.city ? dealer.city : "Not provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Bank Account No. :" + (dealer.AccountNumber ? dealer.AccountNumber : "Not Provided")}</Text>
            <Text style={{ color: 'black', fontSize: 14, padding: 1 }}>{"Bank IFSC Code :" + (dealer.IfscCode ? dealer.IfscCode : "Not Provided")}</Text>


            <SafeAreaView style={{ flex: 1 }}>
                <FlatList data={filteredItems} renderItem={({ item }) =>
                (<View style={styles.card}>

                    <SliderBox
                        style={{ height: 150, marginBottom: 10 }}
                        images={item.images}
                        autoplay={true}
                        circleLoop={true}
                        resizeMode={'contain'}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Product Name : {item.productName}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Price : {item.productPrice}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Category : {item.category}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Stocks : {item.stocks}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Description : {item.description}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Specs : {item.specs}</Text>
                            <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center' }}>Date : {item.productDate}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: 150,justifyContent:'space-evenly' }}
                        >
                            <View style={{
                                marginTop: 8,
                                borderRadius: 10,
                                elevation: 3,
                                flex: 1,
                                backgroundColor: '#d8eafd',
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: '#333',
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                borderWidth: 2,
                                borderColor: '#DCDCDC',
                                marginHorizontal: 4,
                                marginVertical: 10,
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => deleteProduct(item)}>
                                    <Text style={{ fontSize: 20 }}>Discard</Text>
                                    <AntDesign name="close" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginTop: 8,
                                borderRadius: 10,
                                elevation: 3,
                                flex: 1,
                                backgroundColor: '#d8eafd',
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: '#333',
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                borderWidth: 2,
                                borderColor: '#DCDCDC',
                                marginHorizontal: 4,
                                marginVertical: 10,
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => acceptProduct(item)}>
                                    <Text style={{ fontSize: 20 }}>Accept</Text>
                                    <AntDesign name="check" size={30} color="green" />
                                </TouchableOpacity>
                            </View>
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
                            <Text style={{ paddingLeft: 15, marginTop: 10 }}>Enter Product Price:</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={styles.modalTextInput} keyboardType={'number-pad'} onChangeText={(price) => setAdminPrice(price)} value={adminPrice} />
                            </View>
                            <Text style={{ paddingLeft: 15, marginTop: 10 }}>Enter Product Discount Percentage:</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={styles.modalTextInput} keyboardType={'number-pad'} onChangeText={(discount) => setDiscountRate(discount)} value={discountRate} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={{ padding: 10, width: '30%' }}>
                                    <Button title='Cancel' style={styles.modalButton} onPress={() => setShowModal(false)} />
                                </View>
                                <View style={{ padding: 10, width: '30%' }}>
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
                <Modal
                    visible={showModal2}
                    position='center'
                    transparent={true}
                    onRequestClose={() => setShowModal2(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.cardModalScreen}>
                            
                            <Text style={{ paddingLeft: 15, marginTop: 10 }}>Enter Reason:</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={styles.modalTextInput} onChangeText={(reason) => setReason(reason)} value={reason} />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={{ padding: 10, width: '30%' }}>
                                    <Button title='Cancel' style={styles.modalButton} onPress={() => setShowModal2(false)} />
                                </View>
                                <View style={{ padding: 10, width: '30%' }}>
                                    <Button title='OK' onPress={() => {
                                        if (reason.size != 0 ) {
                                            addReason()
                                        } else Toast.show("Enter valid reason", Toast.SHORT);
                                    }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
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
        padding: 5,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },

    cardModalScreen: {
        height: 300,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: '#000a1a',
        backgroundColor: '#d8eafd'
    },

    modalTextInput: {
        width: '90%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#000a1a',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
});