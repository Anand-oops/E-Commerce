import { createStackNavigator } from "@react-navigation/stack";
import { View,Text,FlatList,TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React,{useState} from 'react';
import Card from "../shared/Card";
import ShopByCategory from '../screens/ShopByCategory';
import NewScreen from "../screens/NewScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import Firebase from "../firebaseConfig";

const Stack = createStackNavigator();
const Categories =(props)=>{

	
	const [AllCategories, setAllCategories] = useState([]);
	const [listenCheck, setListenCheck] = useState(true);
	
	
	
	Firebase.database().ref('DrawerItemsList').on('value', (data) => {
		if (listenCheck) {
			if (data.val()) {
				
				var keys = Object.keys(data.val());
				var temp = []
				
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i]
					
						temp.push(data.val()[key]);
						
	
				}
				
				setAllCategories(temp);
				
			   
			} else
				Toast.show("No Categories", Toast.SHORT);
			setListenCheck(false);
			
		}
	});


return(
    <View style={{flex:1}}>
        <FlatList data={AllCategories} renderItem={({item}) =>
            (<Card>
                    
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => {props.navigation.navigate('ShopByCategory',{name:item.itemName});}}>
                            <Text style={{ color: 'black', fontSize: 16 ,fontWeight:'bold',alignSelf:'center'}}>{item.itemName}</Text>
                        </TouchableOpacity >
                        
                    
                
            </Card>)}>

            </FlatList>

    </View>
)
}



export default function Products({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="Categories" component={Categories} options={{
			title: 'Categories',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Categories</Text>
					</View>
				</View>
			),
		}} />

		<Stack.Screen name="ShopByCategory" component={ShopByCategory} options={{
			title: 'SubCategories',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Sub Categories</Text>
					</View>

				</View>
			),
		}} />
		<Stack.Screen name="NewScreen" component={NewScreen} options={{
			title: 'Products',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Products</Text>
					</View>

				</View>
			),
		}} />
		<Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{
			title: 'ProductDetails',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Products Details</Text>
					</View>

				</View>
			),
		}} />

	</Stack.Navigator>
)

}