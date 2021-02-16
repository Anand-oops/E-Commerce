import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const Card = props => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                <TouchableOpacity onPress={props.deleteCard.bind()}>
                        <Image source={require('../assets/images/delete-card.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, fontWeight: 'bold'}}>{props.header}</Text>
                    <TouchableOpacity onPress={props.addImage.bind()}>
                        <Image source={require('../assets/images/add-item.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <FlatList data={props.images}
                        renderItem={ (itemData) => (
                            <View >
                                <TouchableOpacity style={styles.Container} onLongPress={props.deleteImage.bind(this, itemData.index)}>
                                <Image style={styles.image} source={itemData.item.image} />
                                    <View style={{marginLeft:20}}>
                                        <Text style={{ color: 'blue' }}>Sub-Category : {itemData.item.product.subCategory}</Text>
                                        <Text style={{ color: 'purple' }}>Product Id : {itemData.item.product.productKey}</Text>
                                        <Text style={styles.text}>Sale : {itemData.item.textItem}</Text>
                                        <Text style={styles.offerText}>Sale discount : {itemData.item.textOff + " % off !"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        scrollEnabled={true} />
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
    },

    headerContainer: {
        width: '90%',
        marginTop: 30,
        backgroundColor: '#778899',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 50
    },

    cardContainer: {
        alignItems: 'center',
    },

    card: {
        flex: 1,
        width: '90%',
        elevation: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#DCDCDC',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 20
    },

    Container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        borderWidth: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        height: 35,
        width: 35,
        paddingHorizontal: 10
    },

    image: {
        height: 100,
        width: 100,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    text: {
        color: 'red',
    },

    offerText: {
        color: 'darkgreen',
        fontSize: 16,
    }

});

export default Card;