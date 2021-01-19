import React , {useState} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native';
import Card from "../shared/Card";
import { AntDesign } from '@expo/vector-icons';
import Firebase from '../firebaseConfig'; 

export default function PendingListScreen({navigation}) {

const pressHandler =(item)=>{
    console.log("clicked");
    navigation.navigate('DealerItems',{id:item});
}
    const [items, setItems] = useState([]);
    
    const [listenCheck, setListenCheck] = useState(true);
    Firebase.database().ref('Dealers/').once('value').then((data) => {
		if (listenCheck) {
			if (data.val()) {

                var keys = Object.keys(data.val());
                console.log(keys);
				setItems(keys);
				// console.log("Items", items);
				setListenCheck(false);
			}
		}
	})
    return (
        
        <View style={styles.main}>
             
                <FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Text style={{ color: 'black', fontSize: 16 }}>{"Dealer ID : "+ item }</Text>
				<TouchableOpacity style={{ position: 'absolute', right: 10 }}
					onPress={() => pressHandler(item) }>
					<AntDesign name="doubleright" size={30} color="black" />
				</TouchableOpacity>
				
			</Card>)}>

			</FlatList>
                
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height:'100%',
        width:'100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop:'50%'
    },
});