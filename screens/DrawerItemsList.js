import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function DrawerItemsList() {


  const [listenCheck,setListenCheck]=useState(true);
  const [visible, setVisible] = useState(false);
  const [items,setItems]=useState([]);
  const [text, onTextChange] = useState('');
  // const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Second Item',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     title: 'Third Item',
  //   },
  // ];

  const addItem=(text)=>{ 

      var newPostKey = Firebase.database().ref().child('DrawerItemsListGarvit/').push().key;
      var postData = {
           name:text,
      };

      var updates = {};
      updates['DrawerItemsListGarvit/' + newPostKey] = postData;
      Firebase.database().ref().update(updates);
    // Firebase.database().ref(`DrawerItemsListGarvit/`).push({
    //   name:text,
    // });
    setVisible(!visible);
    onTextChange('');
    setListenCheck(true);
  };

  Firebase.database().ref('DrawerItemsListGarvit/').on('value',function (snapshot) {
    if(listenCheck){
      if(snapshot.val()!=null){
    setItems([...items,snapshot.val()]);
      }
    console.log("hi",items);
    console.log(JSON.stringify(items));
    setListenCheck(false);
  }
  })
  
  return (

    <View style={styles.main}>

      <FlatList data={Object.keys(items) }renderItem={({ item }) =>
      (<Card>
        <Text style={{ color: 'black', fontSize: 20 }}>{items[item].name}</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 50 }}>
          <Entypo name="edit" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 5 }}>
          <MaterialIcons name="delete" size={35} color="blue" />
        </TouchableOpacity>
      </Card>)}>

      </FlatList>




      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: 'black', width: '100%' }}
        onPress={() => { setVisible(true) }}>
        <Text style={{ color: 'white', fontSize: 20 }}>ADD ITEM</Text>
      </TouchableOpacity>
      
      <Modal visible={visible} transparent={true}  position='center'  >
        <View
          style={{
            height: 150,
            padding: 20,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={{ alignSelf: 'center' }}>ADD ITEM</Text>
          <TextInput
            style={{ margin: 3 }}
            // value={text}
            onChangeText={(val)=>{onTextChange(val)}}
            placeholder={'Enter text'}
          />
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={{ margin: 1, padding: 1 }}><Button title="close" onPress={() => setVisible(!visible)} /></View>
            <View style={{ margin: 1, padding: 1 }}><Button title="ok" onPress={()=>{addItem(text)}} /></View>
          </View>
        </View>
      </Modal>
      
    </View>

  );

}

const styles = StyleSheet.create({
  main: {

    height: '100%',
    width: '100%'
    // height:Dimensions.get('window').height ,
    // width:Dimensions.get('window').width
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: '50%'


  },




});


  
