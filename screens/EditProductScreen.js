import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import Firebase from '../firebaseConfig'
import * as ImagePicker from 'expo-image-picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { SliderBox } from 'react-native-image-slider-box'
import { ScrollView } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast';

export default function AddProductScreen(props) {

    const { user } = useContext(AuthContext);
    console.log("Props", props.route.params.product)
    const item = props.route.params.product;

    const [adminProducts, setAdminProducts] = useState([]);
    const [adminProductsCall, setAdminProductsCall] = useState(true)
    const [dropdownCat, setDropdownCat] = useState([]);
    const [productImages, setProductImages] = useState(item.images)
    const [productName, setProductName] = useState(item.productName)
    const [productPrice, setProductPrice] = useState(item.productPrice)
    const [productStocks, setProductStocks] = useState(item.stocks)
    const [productDescription, setProductDescription] = useState(item.description)
    const [productCategory, setProductCategory] = useState('')
    const [productSpecs, setProductSpecs] = useState(item.specs)
    const [imageDeckIndex, setImageDeckIndex] = useState(-1)
    const [drawerItemsCall, setDrawerItemsCall] = useState(true)
    const [subCategories, setSubCategories] = useState([])
    const [dropDownSubCat, setDropDownSubCat] = useState([])
    const [index, setIndex] = useState(-1);
    const [productSubCategory, setProductSubCategory] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [discount, setDiscount] = useState(item.discount)

    Firebase.database().ref('DrawerItemsList/').on('value', (snapshot) => {
        if (drawerItemsCall) {
            if (snapshot.val()) {
                var cats = [];
                var subCats = [];
                var keys = Object.keys(snapshot.val())
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    var cat = snapshot.val()[key].itemName
                    cats.push({ label: cat, value: cat })
                    subCats.push(snapshot.val()[key])
                }
                setSubCategories(subCats);
                setDropdownCat(cats);
            }
            setDrawerItemsCall(false)
        }
    })

    const AddImageHandler = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        let URI = pickerResult.uri;
        const imageName = URI.substring(URI.lastIndexOf('/') + 1);
        const response = await fetch(URI);
        const blob = await response.blob();
        Firebase.storage()
            .ref(`${imageName}`)
            .put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    setProductImages([...productImages, { uri: url }])
                });
            })
            .catch((e) => console.log('uploading image error => ', e));
    };

    const DeleteImageHandler = imageDeckIndex => {
        if (productImages.length >= 0) {
            const images = productImages;
            const imageRef = productImages.splice(imageDeckIndex, 1);
            if (imageRef[0]) {
                setProductImages(images)
            }
        }
    };

    const addProduct = () => {
        if (productImages[0].uri) {
            const product = {
                dealerId: item.dealerId,
                key: item.key,
                productDate: item.productDate,
                productTime: item.productTime,
                productName: productName,
                productPrice: productPrice,
                stocks: productStocks,
                category: productCategory,
                subCategory: productSubCategory,
                finalPrice: productPrice,
                discount: discount + " %",
                finalPrice: productPrice - (productPrice * discount) / 100,
                description: productDescription,
                specs: productSpecs,
                status: 'Pending',
                images: productImages,
                image: productImages[0],
                deliveryStatus: 'Pending',
                rating: item.rating,
            };

            Firebase.database().ref(`ProductList/${productCategory}/${productSubCategory}/${product.key}`).update(product).then(() => {
                setAdminProductsCall(true)
                Toast.show("Product Updated", Toast.SHORT);
                setProductName('')
                setProductPrice('')
                setProductSpecs('')
                setProductStocks('')
                setProductDescription('')
                setProductCategory('')
                setProductSubCategory('')
                setProductImages([])
                setDiscount('')
                setDisabled(true)
                props.navigation.goBack();
            })
        }
        else {
            Alert.alert('Image Not Found', 'Pick an Image from the gallery');
        }
    };





    return (
        <View style={styles.main}>
            <StatusBar style='light' />

            <ScrollView >

                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => DeleteImageHandler(imageDeckIndex)}>
                        <Image source={require('../assets/images/delete.png')} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Product Images </Text>
                    <TouchableOpacity onPress={() => AddImageHandler()}>
                        <Image source={require('../assets/images/add.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageDeck}>
                    <SliderBox
                        images={productImages}
                        sliderBoxHeight={175}
                        circleLoop={true}
                        autoplay={true}
                        resizeMode={'contain'}
                        currentImageEmitter={index => setImageDeckIndex(index)} />
                </View>
                <TextInput
                    placeholder='Enter your product name'
                    placeholderTextColor='gray'
                    style={styles.textInput}
                    value={productName}
                    onChangeText={(val) => setProductName(val)} />
                <TextInput
                    placeholder='Enter your product price'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    style={styles.textInput}
                    value={productPrice}
                    onChangeText={(val) => setProductPrice(val)} />
                 <TextInput
                    placeholder='Enter product discount on above price'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    style={styles.textInput}
                    value={discount}
                    onChangeText={(val) => setDiscount(val)} />
                <TextInput
                    placeholder='Enter your product stock'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    style={styles.textInput}
                    value={productStocks}
                    onChangeText={(val) => setProductStocks(val)} />
                <TextInput
                    placeholder='Enter your product description'
                    multiline={true}
                    placeholderTextColor='gray'
                    style={styles.textInput}
                    value={productDescription}
                    onChangeText={(val) => setProductDescription(val)} />
                <DropDownPicker
                    items={dropdownCat}
                    placeholder="Select the product category"
                    containerStyle={{ height: 40, margin: 10, }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                    style={{ backgroundColor: '#d8eafd' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => {
                        setProductCategory(item.value),
                            setProductSubCategory('');
                        if (subCategories) {
                            subCategories.map(subcat => {
                                if (subcat.itemName === item.value) {
                                    var temp = [];
                                    if (subcat.SubCategories) {
                                        var keys = Object.keys(subcat.SubCategories)
                                        for (var i = 0; i < keys.length; i++) {
                                            var key = keys[i];
                                            var entry = subcat.SubCategories[key].subitemName
                                            temp.push({ label: entry, value: entry })
                                        }
                                        setDropDownSubCat(temp);
                                        setDisabled(false);
                                    } else {
                                        Toast.show("No subcategories present", Toast.SHORT);
                                    }
                                }
                            })
                        } else {
                            Toast.show("No subcategories present", Toast.SHORT);
                        }
                    }
                    }

                />

                <DropDownPicker
                    items={dropDownSubCat}
                    disabled={disabled}
                    placeholder="Select the product sub category"
                    containerStyle={{ height: 40, margin: 10, }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 20, zIndex: 5 }}
                    style={{ backgroundColor: '#d8eafd' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => { setProductSubCategory(item.value) }}
                />

                <Text style={{ marginTop: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>Product Specifications </Text>
                <TextInput
                    placeholder='(eg: Color:blue , size:XL ,each in new line)'
                    multiline={true}
                    placeholderTextColor='gray'
                    style={styles.textInput}
                    value={productSpecs}
                    onChangeText={(val) => setProductSpecs(val)} />

                <TouchableOpacity style={styles.saveButton} onPress={() => {
                    if (productImages.length != 0 && productName.length != 0 && productPrice.length != 0 && productSubCategory.length != 0
                        && productStocks.length != 0 && discount.length != 0 && productDescription.length != 0 && productCategory.length != 0) {
                        addProduct()
                    }
                    else {
                        if (productSubCategory.length == 0) {
                            Toast.show("Select Sub Category", Toast.SHORT);
                        } else
                            Toast.show("Fill required fields", Toast.SHORT);
                    }

                }}>
                    <Text style={{ color: 'white', fontSize: 20 }} >Update Product</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca'
    },
    saveButton: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        backgroundColor: '#000a1a',
        padding: 15,
        elevation: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#000a1a',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageDeck: {
        height: 175,
        borderColor: '#000a1a',
        borderWidth: 1,
        backgroundColor: '#778899',
        alignItems: 'center',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#000a1a',
        margin: 10,
        padding: 5,
        backgroundColor: '#d8eafd',
        borderRadius: 5
    },
    image: {
        height: 35,
        width: 35,
    },
});