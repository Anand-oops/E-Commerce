import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {

    return (
        
        <View style={styles.main}>
            
            <LinearGradient
                colors={['#20527e', '#f08080']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Text style={ {color:'black'}}>this is profile Screen </Text>
            </LinearGradient>



            {/* <View>
                <TextInput
                style = {styles.inputText}
                placeholder='Enter Email'
                />
                </View> */}

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