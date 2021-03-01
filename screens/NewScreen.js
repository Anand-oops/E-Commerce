import React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";
import { SearchBar } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import { CheckBox } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
import { windowWidth } from '../shared/Dimensions'
import StarRating from "react-native-star-rating";


export default function NewScreen(props) {

    const [listen, setListen] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('Filter')
    const [sort, setSort] = useState('Sort')
    const [ratingFilterBool, setRatingFilterBool] = useState(false)
    const [rangeFilterBool, setRangeFilterBool] = useState(false)
    const [ratingFilterIndex, setRatingFilterIndex] = useState(-1);
    const [rangeFilterIndex, setRangeFilterIndex] = useState(-1);

    const ratingRBSheet = useRef();
    const rangeRBSheet = useRef();

    const rangeList = ['Below ₹ 500 /-', 'Below ₹ 1000 /-', 'Below ₹ 5,000 /-', 'Below ₹ 10,000 /-', '₹ 10,000 & above']
    const ratingList = ['⭐⭐⭐⭐ & Above', '⭐⭐⭐ & Above', '⭐⭐ & Above', '⭐ & Above']

    Firebase.database().ref(`ProductList/${props.route.params.name}/${props.route.params.subitemName}`).on('value', (data) => {
        if (listen) {
            if (data.val()) {
                var temp = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }
                setListen(false);
                setProducts(temp);
                setFilteredProducts(temp);
            }
        }

    })

    const itemsPress = (item) => {
        console.log("clicked");
        props.navigation.navigate('ProductDetailsScreen', { item: item });
    }

    const performSearch = (value) => {
        var filtered = [];
        if (value.length == 0 || value === '') {
            filtered = products;
        } else {
            products.map(prod => {
                if (prod.productName.toLowerCase().includes(value.toLowerCase())) {
                    filtered.push(prod);
                }
            })
        }
        console.log("Search", sort, filter, rangeFilterBool, ratingFilterBool);
        performSort(sort, filtered, filter, rangeFilterBool, ratingFilterBool);
    }

    const performSort = (text, products, filter, val1, val2) => {
        if (text === 'Price(Low:High)') {
            products.sort((a, b) => (parseFloat(a.productPrice) > parseFloat(b.productPrice)) ? 1 : ((parseFloat(b.productPrice) > parseFloat(a.productPrice)) ? -1 : 0))
        } else if (text === 'Price(High:Low)') {
            products.sort((a, b) => (parseFloat(a.productPrice) > parseFloat(b.productPrice)) ? -1 : ((parseFloat(b.productPrice) > parseFloat(a.productPrice)) ? 1 : 0))
        } else if (text === 'Oldest First') {
            products.sort((a, b) => (a.key > b.key) ? 1 : -1)
        } else if (text === 'Newest First') {
            products.sort((a, b) => (a.key > b.key) ? -1 : 1)
        } if (val1 && val2) {
            performFilter('Both', products)
        } else
            performFilter(filter, products)
    }

    const initiateFilter = (text) => {
        if (text === 'Rating') {
            ratingRBSheet.current.open();
        }
        else if (text === 'Range') {
            rangeRBSheet.current.open();
        } else {
            setRangeFilterBool(false);
            setRatingFilterBool(false);
            setFilter('Filter')
            setRatingFilterIndex(-1);
            setRangeFilterIndex(-1);
            setSearchText('')
            if (sort === 'Sort') {
                setFilteredProducts(products)
            } else
                performSort(sort, products, 'Filter', false, false)
        }
    }

    const performFilter = (text, products) => {
        console.log("Filterby", text);
        if (text === 'Range') {
            var filtered = [];
            if (rangeFilterIndex === 0) {
                products.map((prod) => {
                    if (prod.finalPrice < 500) {
                        filtered.push(prod)
                    }
                })
            }
            else if (rangeFilterIndex === 1) {
                products.map((prod) => {
                    if (prod.finalPrice < 1000) {
                        filtered.push(prod)
                    }
                })
            }
            else if (rangeFilterIndex === 2) {
                products.map((prod) => {
                    if (prod.finalPrice < 5000) {
                        filtered.push(prod)
                    }
                })
            }
            else if (rangeFilterIndex === 3) {
                products.map((prod) => {
                    if (prod.finalPrice < 10000) {
                        filtered.push(prod)
                    }
                })
            }
            else {
                products.map((prod) => {
                    if (prod.finalPrice >= 10000) {
                        filtered.push(prod)
                    }
                })
            }
            setFilteredProducts(filtered);
        }
        else if (text === 'Rating') {
            var filtered = [];
            if (ratingFilterIndex === 0) {
                products.map((prod) => {
                    if (prod.rating >= 4) {
                        filtered.push(prod)
                    }
                })
                console.log("Rating 4 an above")
            } else if (ratingFilterIndex === 1) {
                products.map((prod) => {
                    if (prod.rating >= 3) {
                        filtered.push(prod)
                    }
                })
                console.log("Rating 3 an above")
            } else if (ratingFilterIndex === 2) {
                products.map((prod) => {
                    if (prod.rating >= 2) {
                        filtered.push(prod)
                    }
                })
                console.log("Rating 2 an above")
            } else {
                products.map((prod) => {
                    if (prod.rating >= 1) {
                        filtered.push(prod)
                    }
                })
                console.log("Rating 1 an above")
            }
            setFilteredProducts(filtered)
        } else if (text === 'Both') {
            var filtered = [];
            var price;
            var check = false;
            if (rangeFilterIndex == 0) {
                price = 500;
                check = true;
            }
            else if (rangeFilterIndex == 1) {
                price = 1000;
                check = true;
            }
            else if (rangeFilterIndex == 2) {
                price = 5000;
                check = true;
            }
            else if (rangeFilterIndex == 3) {
                price = 10000;
                check = true;
            }
            if (check) {
                if (ratingFilterIndex === 0) {
                    products.map((prod) => {
                        if (prod.rating >= 4 && prod.finalPrice < price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 4 an above + smaller than ", price)
                } else if (ratingFilterIndex === 1) {
                    products.map((prod) => {
                        if (prod.rating >= 3 && prod.finalPrice < price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 3 an above + smaller than ", price)
                } else if (ratingFilterIndex === 2) {
                    products.map((prod) => {
                        if (prod.rating >= 2 && prod.finalPrice < price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 2 an above + smaller than ", price)
                } else {
                    products.map((prod) => {
                        if (prod.rating >= 1 && prod.finalPrice < price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 1 an above + smaller than ", price)
                }
            }
            else {
                price = 10000;
                if (ratingFilterIndex === 0) {
                    products.map((prod) => {
                        if (prod.rating >= 4 && prod.finalPrice >= price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 4 an above + greater than ", price)
                } else if (ratingFilterIndex === 1) {
                    products.map((prod) => {
                        if (prod.rating >= 3 && prod.finalPrice >= price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 4 an above + greater than ", price)
                } else if (ratingFilterIndex === 2) {
                    products.map((prod) => {
                        if (prod.rating >= 2 && prod.finalPrice >= price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 4 an above + greater than ", price)
                } else {
                    products.map((prod) => {
                        if (prod.rating >= 1 && prod.finalPrice >= price) {
                            filtered.push(prod)
                        }
                    })
                    console.log("Rating 4 an above + greater than ", price)
                }
            }
            setFilteredProducts(filtered)
        }
        else
            setFilteredProducts(products)
    }

    return (

        <View style={styles.main}>
            <StatusBar style='light' />
            <SearchBar
                placeholder="Search by Name"
                inputContainerStyle={{ height: 30 }}
                onChangeText={(text) => { setSearchText(text), performSearch(text) }}
                value={searchText}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <DropDownPicker
                    items={[{ label: 'Rating', value: 'Rating' },
                    { label: 'Range', value: 'Range' },
                    { label: 'No Filter', value: 'Filter' }]}
                    defaultValue="Filter"
                    containerStyle={{ height: 30, width: '50%' }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 5 }}
                    style={{ backgroundColor: 'white' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => {
                        setFilter(item.value), initiateFilter(item.value)
                    }}
                />
                <DropDownPicker
                    items={[{ label: 'Price(Low:High)', value: 'Price(Low:High)' },
                    { label: 'Price(High:Low)', value: 'Price(High:Low)' },
                    { label: 'Newest First', value: 'Newest First' },
                    { label: 'Oldest First', value: 'Oldest First' },
                    { label: 'No Sort', value: 'Sort' }]}
                    defaultValue="Sort"
                    containerStyle={{ height: 30, width: '50%' }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 5 }}
                    style={{ backgroundColor: 'white' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => { setSort(item.value), performSort(item.value, filteredProducts, filter, ratingFilterBool, rangeFilterBool) }}
                />
            </View>
            <FlatList style={{ flex: 1, padding: 4 }}
                data={filteredProducts}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => itemsPress(item)}>
                            <View >
                                <View >
                                    <Image
                                        style={{ padding: 2, height: 150, width: '98%', resizeMode: 'contain', alignSelf: 'center', }}
                                        source={{ uri: item.image.uri }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#3b3a30', fontSize: 18, paddingLeft: 4, textTransform: 'capitalize', flex: 1 }}>{item.productName}</Text>
                                    <View style={{ marginRight: 10 }}>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={item.rating}
                                            starSize={15}
                                            fullStarColor={'#ffa500'}
                                            emptyStarColor={'#ff4500'}
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: '#DCDCDC', fontSize: 12, paddingLeft: 4 }}>{item.description}</Text>
                                <Text style={{ color: '#DCDCDC', fontSize: 12, paddingLeft: 4 }}>{item.specs}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#3b3a30', fontSize: 18, padding: 2, flex: 1 }}>{"₹" + item.finalPrice}</Text>
                                    <Text style={{ color: '#82b74b', fontSize: 18, padding: 2, flex: 1 }}>{item.discount + "off "}</Text>
                                </View>
                                <Text style={{ color: '#3b3a30', fontSize: 10, paddingLeft: 4, paddingBottom: 2, textDecorationLine: 'line-through' }}>{"₹" + item.productPrice}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}>
            </FlatList>
            <TouchableOpacity >
                <RBSheet
                    ref={ratingRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={300}
                    animationType='fade'
                    customStyles={{
                        container: {
                            backgroundColor: '#d8eafd'
                        },
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <View >
                        <FlatList data={ratingList}
                            renderItem={data => (
                                <CheckBox
                                    title={data.item}
                                    checked={(data.index === ratingFilterIndex) ? true : false}
                                    onPress={() => { setRatingFilterIndex(data.index), setRatingFilterBool(true) }}
                                />
                            )}
                        />
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                setRatingFilterBool(false);
                                setRatingFilterIndex(-1);
                                if (rangeFilterBool) {
                                    setFilter('Range')
                                    if (searchText.length == 0 || searchText === '')
                                        performSort(sort, products, 'Range', true, false)
                                    else
                                        performSearch(searchText)
                                }
                                else {
                                    setFilter('Filter')
                                    if (searchText.length == 0 || searchText === '')
                                        performSort(sort, products, 'Filter', false, false)
                                    else
                                        performSearch(searchText)
                                }
                                ratingRBSheet.current.close()
                            }}>
                                <Text style={{ color: 'white' }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                if (searchText.length == 0 || searchText === '') {
                                    if (ratingFilterBool && rangeFilterBool) {
                                        performSort(sort, products, 'Both', true, true)
                                    } else
                                        performSort(sort, products, filter, ratingFilterBool, rangeFilterBool)
                                } else {
                                    performSearch(searchText)
                                }
                                ratingRBSheet.current.close()
                            }} >
                                <Text style={{ color: 'white' }}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </RBSheet>

                <RBSheet
                    ref={rangeRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={350}
                    animationType='fade'
                    customStyles={{
                        container: {
                            backgroundColor: '#d8eafd'
                        },
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <ScrollView >
                        <FlatList data={rangeList}
                            renderItem={data => (
                                <CheckBox
                                    title={data.item}
                                    checked={(data.index === rangeFilterIndex) ? true : false}
                                    onPress={() => { setRangeFilterIndex(data.index), setRangeFilterBool(true) }}
                                />
                            )}
                        />
                        <View style={{ flexDirection: 'row' }} >

                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                setRangeFilterBool(false);
                                setRangeFilterIndex(-1);
                                if (ratingFilterBool) {
                                    setFilter('Rating')
                                    if (searchText.length == 0 || searchText === '')
                                        performSort(sort, products, 'Rating', true, false)
                                    else
                                        performSearch(searchText)
                                }
                                else {
                                    setFilter('Filter')
                                    if (searchText.length == 0 || searchText === '')
                                        performSort(sort, products, 'Filter', false, false)
                                    else
                                        performSearch(searchText)
                                }
                                rangeRBSheet.current.close()
                            }} >
                                <Text style={{ color: 'white' }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={() => {
                                if (searchText.length == 0 || searchText === '') {
                                    if (rangeFilterBool && ratingFilterBool) {
                                        performSort(sort, products, 'Both', true, true)
                                    } else {
                                        performSort(sort, products, filter, ratingFilterBool, rangeFilterBool)
                                    }
                                } else {
                                    performSearch(searchText)
                                }
                                rangeRBSheet.current.close()
                            }}>
                                <Text style={{ color: 'white' }} >Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </RBSheet>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a6b8ca'
    },
    filterButton: {
        width: windowWidth / 2,
        textAlign: 'center',
        color: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        backgroundColor: '#000a1a',
        padding: 15,
        elevation: 10,
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
    }
});