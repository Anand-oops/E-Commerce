import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const Card = props => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                <TouchableOpacity onPress={props.deleteCard.bind()}>
                        <Image source={require('../assets/images/delete.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, fontWeight: 'bold'}}>{props.header}</Text>
                    <TouchableOpacity onPress={props.addImage.bind()}>
                        <Image source={require('../assets/images/add.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <FlatList data={props.images}
                        renderItem={ (itemData) => (
                            <View style={styles.Container}>
                                <TouchableOpacity onLongPress={props.deleteImage.bind(this, itemData.index)}>
                                    <Image style={styles.image} source={itemData.item.image} />
                                    <Text style={styles.text}>{itemData.item.textItem}</Text>
                                    <Text style={styles.offerText}>{itemData.item.textOff}</Text>
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
        marginTop: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        backgroundColor: 'white',
    },

    Container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 0.3,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        height: 35,
        width: 35,
        paddingHorizontal: 10
    },

    image: {
        height: 80,
        width: 80,
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