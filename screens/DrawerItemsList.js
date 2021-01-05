import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import card from "../shared/card";
import Firebase from '../firebaseConfig';
var data;
export default function DrawerItemsList() {

    const ref = Firebase.database().ref(`Admin`);
    ref.on('value', function (snapshot) {
        data = snapshot.val();
        

    })
    return (
        
        <View style={styles.main}>
            <FlatList data={data} renderItem={({item})=>
            (<card><Text style={ {color:'black'}}>{item.name} </Text></card>)}>
                
                </FlatList>
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
