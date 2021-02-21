import { createStackNavigator } from "@react-navigation/stack";
import InsideRegCus from "../screens/InsideRegCus";
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { SearchBar } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'
import { StatusBar } from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker'
import { AntDesign } from '@expo/vector-icons'; 
const Stack = createStackNavigator();

const Customers=({ navigation })=> {

    const [items, setItems] = useState([]);
    const [listenCheck, setListenCheck] = useState(true);
    const [collapsed, setCollapsed] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedItems, setSearchedItems] = useState([])
    const [searchedColl, setSearchedColl] = useState([])
    const [searchBy, setSearchBy] = useState('name');
    const [loader, setLoader] = useState(true);
    

    Firebase.database().ref('Customers/').on('value', (data) => {
        if (listenCheck) {
            if (data.val()) {
                var keys = Object.keys(data.val());
                var temp = []
                var coll = []
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i]
                    if(data.val()[key].activity){
                        temp.push(data.val()[key])
                        coll.push(true)
                    }
                    
                }
                setItems(temp);
                setSearchedItems(temp);
                setSearchedColl(coll);
                setCollapsed(coll);
            }
            
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
    const RemoveFromBlackList=(item)=>{
        Firebase.database().ref(`Customers/${item.id}/activity`).remove();
        setListenCheck(true);
    }
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
                <View style={{flex:1}}>
                <View style={{flexDirection:'row',flex:1}}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => pressHandler(index)}>
                    <Text style={{ color: 'black', fontSize: 16 }}>{"ID : " + item.id}</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>Name : {item.firstName ? item.firstName + " " + (item.lastName ? item.lastName : " ") : "No name provided"}</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>Mobile No. : {item.mobile ? item.mobile : "No number provided"}</Text>
                    <Collapsible collapsed={searchedColl[index]} >
                        <Text style={{ color: 'black', fontSize: 16 }}>Email : {item.email}</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>City : {item.city ? item.city : 'Not provided'}</Text>
                    </Collapsible>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:'center'} } onPress={()=>{navigation.navigate('InsideRegCus',{id:item.id})}}>
                <AntDesign name="rightcircle" size={24} color="#000a1a" />
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{
                    Alert.alert("Remove from Blacklist", "Are you sure ?",
                    [
                        { text: "Cancel" },
                        { text: "Proceed", onPress: () => RemoveFromBlackList(item) }
                    ], { cancelable: false }
                );
                }}>
                    <View style={{borderRadius:5,elevation:1,padding:4,margin:4,backgroundColor:'pink'}}>
                        <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Remove from Blacklist</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </Card>)}>

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
        backgroundColor:'#a6b8ca'
    },
});


export default function InactiveCustomers({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="Customers" component={Customers} 
            options={{
                title: 'Customers',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }} 
            />
            <Stack.Screen name="InsideRegCus" component={InsideRegCus} 
            options={{
                title: 'Customers Details',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }}
             />


        </Stack.Navigator>
    )

}