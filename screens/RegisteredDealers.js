import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, Keyboard, TextInput, Button } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { SearchBar } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'
import { StatusBar } from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker'
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';

export default function Dealers({ navigation }) {

    const [items, setItems] = useState([]);
    const [listenCheck, setListenCheck] = useState(true);
    const [collapsed, setCollapsed] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedItems, setSearchedItems] = useState([])
    const [searchedColl, setSearchedColl] = useState([])
    const [searchBy, setSearchBy] = useState('name');
    const [loader, setLoader] = useState(true);
    const [reason, setReason] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState([]);

    Firebase.database().ref('Dealers/').on('value', (data) => {
        if (listenCheck) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = []
                var coll = []
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    if (!data.val()[key].activity) {
                        temp.push(data.val()[key])
                        coll.push(true)
                    }

                }
                setItems(temp);
                setSearchedItems(temp);
                setSearchedColl(coll);
                setCollapsed(coll);
            } else
                Toast.show("No Registered Dealer", Toast.SHORT);
            setListenCheck(false);
            setLoader(false);
        }
    });

    const performSearch = (text) => {
        var filter = [];
        var status = [];
        if (text.length == 0 || text === '') {
            filter = items;
            status = collapsed;
        } else {
            if (searchBy === 'name') {
                items.map(item => {
                    if (item.firstName != null && item.lastName != null) {
                        if ((item.firstName.toLowerCase()).includes(text.toLowerCase()) || (item.lastName.toLowerCase()).includes(text.toLowerCase())) {
                            filter.push(item);
                            status.push(collapsed[items.indexOf(item)])
                        }
                    }
                })
            }
            else {
                items.map(item => {
                    if (item.mobile != null) {
                        if ((item.mobile).includes(text)) {
                            filter.push(item);
                            status.push(collapsed[items.indexOf(item)])
                        }
                    }
                })
            }
        }
        setSearchedItems(filter);
        setSearchedColl(status);
    }

    const pressHandler = (index) => {
        let status = [...searchedColl];
        status.splice(index, 1, !status[index])
        setSearchedColl(status)
        let final = [...collapsed]
        let ind = items.findIndex(item => item.id === searchedItems[index].id)
        final.splice(ind, 1, !final[ind])
        setCollapsed(final);
    }
    const addtoBlackList = (item) => {
        var notif = "You have been Blacklisted . Reason : " + reason + ". Contact Admin."
        Firebase.database().ref(`Dealers/${item.id}/Notifications`).push(notif);
        setReason('');
        setShowModal(false);
        Firebase.database().ref(`Dealers/${item.id}`).update({
            activity: 'Inactive'
        })
        setListenCheck(true);
    }

    const closeModal = () => { setShowModal(false), setReason('') }

    return (
        <View style={styles.main}>
            <StatusBar style='light' />
            <SearchBar
                placeholder="Search"
                inputContainerStyle={{ height: 30 }}
                onChangeText={(text) => { setSearchText(text), performSearch(text) }}
                value={searchText}
                keyboardType={(searchBy === 'number') ? 'number-pad' : 'default'}
            />
            <View style={{ flexDirection: 'row-reverse' }}>
                <DropDownPicker
                    items={[{ label: 'By Name', value: 'name' },
                    { label: 'By Mobile No.', value: 'number' }]}
                    defaultValue="name"
                    containerStyle={{ height: 30, width: '50%' }}
                    dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 5 }}
                    style={{ backgroundColor: 'white' }}
                    labelStyle={{ color: 'black' }}
                    activeLabelStyle={{ color: 'blue' }}
                    onChangeItem={item => {
                        setSearchBy(item.value), setSearchText(''), performSearch('')
                    }}
                />
            </View>
            <FlatList data={searchedItems} renderItem={({ item, index }) =>
            (<Card>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => pressHandler(index)}>
                            <Text style={{ color: 'black', fontSize: 16 }}>{"ID : " + item.id}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>Name : {item.firstName ? item.firstName + " " + (item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>Mobile No. : {item.mobile ? item.mobile : "No number provided"}</Text>
                            <Collapsible collapsed={searchedColl[index]} >
                                <Text style={{ color: 'black', fontSize: 16 }}>Email : {item.email}</Text>
                                <Text style={{ color: 'black', fontSize: 16 }}>City : {item.city ? item.city : 'Not provided'}</Text>
                                <Text style={{ color: 'black', fontSize: 16 }}>Bank Account : {item.AccountNumber ? item.AccountNumber : 'Not provided'}</Text>
                                <Text style={{ color: 'black', fontSize: 16 }}>IFSC Code : {item.IfscCode ? item.IfscCode : 'Not provided'}</Text>
                            </Collapsible>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate('InsideRegDea', { id: item.id }) }}>
                            <AntDesign name="rightcircle" size={30} color="#000a1a" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => {
                        Alert.alert("Blacklist", "Are you sure ?",
                            [
                                { text: "Cancel" },
                                { text: "Proceed", onPress: () => { setShowModal(true), setItem(item) } }
                            ], { cancelable: false }
                        );
                    }}>
                        <View style={{ borderRadius: 5, elevation: 4, padding: 4, margin: 4, backgroundColor: 'pink' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Add to Blacklist</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>)}>

            </FlatList>
            <Modal
                animationType='fade'
                visible={showModal}
                position='center'
                transparent={true}
                onRequestClose={() => closeModal()}>
                <View style={styles.modalContainer}>
                    <View style={styles.cardModalScreen}>
                        <Text style={{ paddingLeft: 15, marginTop: 10, }}>Reason for Blacklisting :</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <TextInput style={styles.modalTextInput} onChangeText={(text) => setReason(text)} value={reason} />
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <View style={{ padding: 10, width: '30%' }}>
                                <Button title='Cancel' onPress={() => { Keyboard.dismiss(), closeModal() }} />
                            </View>
                            <View style={{ padding: 10, width: '30%' }}>
                                <Button title='OK' onPress={() => {
                                    if (reason.length == 0) {
                                        Keyboard.dismiss()
                                        Toast.show("Enter the reason first", Toast.SHORT);
                                    } else {
                                        Keyboard.dismiss(),
                                        setShowModal(false)
                                        addtoBlackList(item);
                                    }
                                }
                                } />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    cardModalScreen: {
        height: 200,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d8eafd'
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
        zIndex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
});
