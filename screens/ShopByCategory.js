import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from "../firebaseConfig";

export default function ShopByCategory({ navigation, route }) {

    var name = route.params.name;
    
    const [listen, setListen] = useState(true);
    const [items, setItem] = useState([]);
    const [loader, setLoader] = useState(true);
    Firebase.database().ref(`DrawerItemsList/`).on('value', (data) => {
        if (listen) {
            if (data.val()) {
                var temp = [];
                var keys = Object.keys(data.val());
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    temp.push(data.val()[key])
                }
                temp.map((item) => {
                    if (item.itemName === name) {
                        console.log("SubCats", item.SubCategories);
                        setItem(item.SubCategories)
                    }
                })
            }
            setLoader(false);
            setListen(false);
        }
    })

    const itemsPress = (item) => {
        console.log("clicked");
        navigation.navigate('NewScreen', { name: name, subitemName: item.subitemName });
    }

    return (

        <View style={styles.main}>
            <FlatList
                data={items}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => itemsPress(item)}>
                            <View style={{ margin: 2, borderRadius: 1, height: 110, flexDirection: 'row' }}>
                                <Image
                                    style={{ padding: 2, height: 120, width: 100, resizeMode: 'contain', alignSelf: 'center', }}
                                    source={{ uri: item.uri }}
                                />
                                <Text style={{ color: '#000a1a', fontSize: 12, alignSelf: 'center', paddingLeft: 5, flex: 1 }}>{item.subitemName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}>

            </FlatList>

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
    }
});