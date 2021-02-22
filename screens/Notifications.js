import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity ,ActivityIndicator} from 'react-native';
import { FlatList, LongPressGestureHandler } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import { AuthContext } from '../navigation/AuthProvider';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from '@expo/vector-icons';


const NotificationsScreen=(props)=> {

    const [listen, setListen] = useState(true)
    const [notif, setNotif] = useState([]);
    const { user } = useContext(AuthContext);
    const [loader,setLoader] = useState(true);
    
    Firebase.database().ref(`Admin/Notifications`).on('value', data => {
        if (listen) {
            if (data.val()) {
                console.log(data.val());
                var list = [];
                var keys = Object.keys(data.val());
                console.log("keys",keys);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    console.log('item',data.val()[key]);
                        list.push(data.val()[key])
                }
                console.log('list',list);

                setNotif(list.reverse());
                console.log("sd",notif);
                
            } else
                Toast.show("No Notifications", Toast.SHORT);
            setListen(false);
            setLoader(false);
            
        }
    });


    return (
        <View style={styles.main}>

            <FlatList data={notif}
                // keyExtractor={(item) => item.orderId}
                renderItem={(data) => (
                    <TouchableOpacity style={{borderRadius:2,elevation:1,margin:8,backgroundColor:'pink',padding:8}} >
                        <View >
                            <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing:0.5,fontSize:18}}>{data.item}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
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
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#000a1a',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    listimage: {
        height: 10,
        width: 10,
        padding: 40,
        marginHorizontal: 10,
    },
});


const Stack = createStackNavigator();

export default function Notifications({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="Notifications" component={NotificationsScreen} options={{
			title: 'Notifications',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Notifications</Text>
					</View>
				</View>
			),
		}} />

	</Stack.Navigator>
)

}
