import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { AuthContext } from '../navigation/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import Firebase from '../firebaseConfig';
import Toast from 'react-native-simple-toast';
import StarRating from "react-native-star-rating";
import { Entypo } from '@expo/vector-icons';

export default function ProductDetailsScreen(props) {

    const { user } = useContext(AuthContext);
    const item = props.route.params.item;
    const [check, setcheck] = useState(true);
    const [check2, setcheck2] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);

    Firebase.database().ref(`Customers/${user.uid}`).on('value', (data) => {
        if (check) {
            if (data.val()) {

                if (data.val().wishlist) {
                    setWishlistItems(data.val().wishlist);
                }
                if (data.val().cart) {
                    setCart(data.val().cart);
                }
                setcheck(false);
            }
        }

    })
    Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}/Reviews`).on('value', (data) => {
        if (check2) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    temp.push(data.val()[key]);
                }
                setReviews(temp);
                setcheck2(false);
            }
        }

    })

    const editItem = (item) => {
        console.log('clcked');
        props.navigation.navigate('EditProductScreen',{product:item});

    }

    const deleteItem=(item)=>{
        Firebase.database().ref(`ProductList/${item.category}/${item.subCategory}/${item.key}`).remove();
    }



    return (
        <ScrollView style={styles.screen}>
            <View style={styles.display}>
                <View style={styles.imageContainer}>
                    <SliderBox
                        images={item.images}
                        sliderBoxHeight={375}
                        circleLoop={true}
                        resizeMode={'contain'} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textTransform: 'uppercase', fontSize: 18, fontWeight: 'bold', paddingBottom: 4 }}>{item.productName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#2f4f4f', fontSize: 15, marginRight: 6, fontWeight: 'bold' }}>{"₹" + parseFloat(item.finalPrice).toFixed(2)}</Text>
                            <Text style={{ color: 'grey', fontSize: 15, marginRight: 6, textDecorationLine: 'line-through' }}>{"₹" + parseFloat(item.productPrice).toFixed(2)}</Text>
                            <Text style={{ color: '#ff4500', fontSize: 15, marginRight: 6 }}>{"(" + item.discount + " OFF)"}</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{"inclusive of all taxes"}</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={item.rating}
                            starSize={25}
                            fullStarColor={'#ffa500'}
                            emptyStarColor={'#ff4500'}
                        />
                        <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{"  (" + item.rating + " out of 5)"}</Text>
                        <Text style={{ fontSize: 12, color: 'orange', fontWeight: 'bold' }}>{'Hurry!! Only ' + item.stocks + ' left.'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.descriptionContainer}>
                    <Text style={{ marginLeft: 7, fontSize: 18, color: '#2f4f4f', fontWeight: 'bold' }}>Product Details:</Text>
                    <Text style={{ marginLeft: 7, color: "grey", marginBottom: 5 }}>{item.description}</Text>

                    <Text style={{ fontSize: 18, marginLeft: 7, color: '#2f4f4f', fontWeight: 'bold' }}>Product Specifications:</Text>
                    <Text style={{ fontSize: 16, marginLeft: 7, marginBottom: 5, color: 'grey' }}>{item.specs}</Text>

                    <View style={{ flexDirection:'row', margin: 5 }}>
                        <TouchableOpacity style={{ flex: 1, margin: 5, flexDirection: 'row', padding: 10, elevation: 10, borderRadius: 4, backgroundColor: 'white', alignItems: 'center',justifyContent:'center' }}
                            onPress={() => { editItem(item) }}>
                                
                            <Entypo name="edit" size={20} color="grey" />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, margin: 5, flexDirection: 'row', padding: 10, elevation: 10, borderRadius: 4, backgroundColor: 'white', alignItems: 'center',justifyContent:'center' }}
                            onPress={() => { Alert.alert("DELETE", "ARE YOU SURE ?",
                            [
                                { text: "Cancel" },
                                { text: "Proceed", onPress: () => deleteItem(item) }
                            ], { cancelable: false }
                        ); }}>
                                
                                <AntDesign name="delete" size={20} color="grey" />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>DELETE</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

            </View>
            <View style={styles.body}>
                <View style={styles.descriptionContainer}>
                    <Text style={{ marginLeft: 7, fontSize: 18, color: '#2f4f4f', fontWeight: 'bold' }}>Reviews:</Text>
                    <FlatList
                        data={reviews}
                        renderItem={({ item }) => (
                            <View style={{ margin: 4 }}>
                                <View style={{ flexDirection: 'row', padding: 8 }}>
                                    <Entypo name="user" size={20} color="#000a1a" />
                                    <Text style={{ flex: 1, paddingHorizontal: 8, fontWeight: 'bold' }}>{item.revTitle}</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={item.revRating}
                                        starSize={20}
                                        fullStarColor={'#ffa500'}
                                        emptyStarColor={'#ff4500'}
                                    />
                                </View>
                                <View
                                    style={{
                                        margin: 2,
                                        borderBottomColor: '#000a1a',
                                        borderBottomWidth: 1,
                                    }}
                                />
                                <Text style={{ margin: 4 }}>{item.revDesc}</Text>

                            </View>

                        )}
                    />
                </View>

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#a6b8ca',
        flex: 1,
    },

    display: {
        borderBottomWidth: 10,
        borderBottomColor: '#000a1a',
        paddingHorizontal: 10,
        paddingBottom: 10

    },

    descriptionContainer: {
        borderBottomWidth: 10,
        borderBottomColor: '#000a1a',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        height: 375,
    },
});