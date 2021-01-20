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
    const [filteredItems,setFilteredItems]=useState([]);
    const [showModal, setShowModal] = useState(false)
    const [adminPrice, setAdminPrice] = useState()
    const [discountRate, setDiscountRate] = useState()
    const [product, setProduct] = useState()
    const [itemIndex, setItemIndex] = useState(-1)
    var id = navigation.getParam('id');
    var filtered=[];

    Firebase.database().ref(`Dealers/${id}`).once('value').then((data) => {
        if (dealerCall) {
            if (data.val()) {
                setDealer(data.val());
                var keys = Object.keys(data.val())
                var key = keys[0];
                setItems(data.val()[key])
                setDealerCall(false);

            }
        }
    })
       for(var i=0;i<items.length;i++){
           
        // console.log('items i',items[i].status);

           if(items[i].status=='Pending'){
            //    console.log("yeah")
               filtered.push(items[i]);
               console.log('it is done',filtered);
            //  setFilteredItems([...filteredItems,items[i]]);
            //  console.log('items i',items[i]);
           }
       }
    //    console.log("filtered Items",filteredItems);
    const acceptProduct = (item, index) => {
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

    function deleteProduct(index) {
        Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                Firebase.database().ref(`Dealers/${id}/DealerProducts/${index}`).update({ status: 'Rejected' });
                setDealerCall(true);
            }
        }]);
    };

    function addProduct() {
        product.productPrice = adminPrice;
        var finalPrice = adminPrice - (adminPrice * discountRate) / 100;
        //var temp = [...product, {finalPrice: finalPrice}]
        var temp = product;
        //TODO : add the final price to the product added in Product List
        Firebase.database().ref('ProductList/' + temp.category).push(temp).then(() => {
            Firebase.database().ref(`Dealers/${id}/DealerProducts/${itemIndex}`).update({ status: 'Accepted',finalPrice:finalPrice });
            Firebase.database().ref( `ProductList/${temp.category}/${id}`).update({finalPrice:finalPrice,discount:discountRate});
            setDealerCall(true);
            
        }).catch((error) => {
            console.log(error);
        });

        setShowModal(false);
    }

    return (
        

        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Dealer Id : " + dealer.id}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Name : " + dealer.firstName + " " + dealer.lastName}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Email : " + dealer.email}</Text>
            <Text style={{ color: 'black', fontSize: 18, padding: 4 }}>{"Mobile No. :" + dealer.mobile}</Text>

            <SafeAreaView style={{flex:1}}>
                <FlatList data={items} renderItem={({ item, index }) =>
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
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => deleteProduct(index)}>
                                <Text style={{ fontSize: 24, paddingLeft: 5 }}>Discard</Text>
                                <AntDesign name="close" size={34} color="red" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => acceptProduct(item, index)}>
                                <Text style={{ fontSize: 24, paddingLeft: 5 }}>Accept</Text>
                                <AntDesign name="check" size={34} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                )}>

                </FlatList>
                {/* </View> */}
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
                                        if (adminPrice.size != 0 && parseFloat(discountRate) > 0 && parseFloat(discountRate) < 100) {
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