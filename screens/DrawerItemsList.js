import React ,{useState}from 'react';
import { StyleSheet, Text, View,FlatList, TouchableOpacity, Button,Modal,TextInput } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
var data;
export default function DrawerItemsList() {
    //   const ref=Firebase.database().ref('drawerItems').push().key();
    // const ref = Firebase.database().ref(`Admin/`);
    // ref.on('value', function (snapshot) {
    //      data = snapshot.val();
    //     ;
    //     console.log(console.log(data));

    // })


    const [visible, setVisible] = useState(false);
  const [text, onTextChange] = useState('');

    const ModalInput = ({ onTextChange, onSubmit, visible, value, toggle }) => {
        return (
          <Modal visible={visible} transparent={true} position='center' style={{ borderRadius:20, alignSelf:'center', justifyContent:'center'}}>
            <View
              style={{
                height: 150,
                padding: 20,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
                <Text style={{alignSelf:'center'}}>ADD ITEM</Text>
              <TextInput
              style={{margin:3}}
                value={value}
                onChangeText={onTextChange}
                placeholder={'Enter text'}
              />
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={{margin:1,padding:1}}><Button title="close" onPress={toggle}  /></View>
                <View style={{margin:1,padding:1}}><Button title="ok" onPress={onSubmit} /></View>
              </View>
            </View>
          </Modal>
        );
      };
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
    return (
        
        <View style={styles.main}>
            
            <FlatList data={DATA}  renderItem={({item})=>
            (<Card>
                <Text style={ {color:'black',fontSize:20}}>{item.title} </Text>
                <TouchableOpacity style={{position:'absolute',right:50}}>
                <Entypo name="edit" size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',right:5}}>
                <MaterialIcons  name="delete" size={35} color="blue" />
                </TouchableOpacity>
                </Card>)}>
                
                </FlatList>
                
            
                  
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center', height:50,backgroundColor:'black',width:'100%'}}
                 onPress={()=>{setVisible(true)}}>
                    <Text style={{color:'white',fontSize:20}}>ADD ITEM</Text>
                </TouchableOpacity>
                <ModalInput 
                    visible={visible}
                    value={text}
                    
                    onTextChange={onTextChange}
                    toggle={() => setVisible(!visible)}
                    onSubmit={() => setVisible(!visible)}
                  />
        </View>

    );

}

const styles = StyleSheet.create({
    main: {
        
        height:'100%',
        width:'100%'
        // height:Dimensions.get('window').height ,
        // width:Dimensions.get('window').width
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop:'50%'
        

    },

 
 

});
