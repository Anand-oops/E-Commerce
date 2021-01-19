import React, { useState }  from 'react';
import { StyleSheet, Text, View,FlatList} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Card from "../shared/Card";
import Firebase from '../firebaseConfig'; 
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function PendingListScreen({navigation}) {


    const [listenCheck, setListenCheck] = useState(true);
    const [dealer,setDealer]=useState([]);
    const [items,setItems]=useState([]);
    const [dummy,setDummy]=useState([]);
    const [imagesDeck,setImages]=useState([]);
    const [allImages,setAllImages]=useState([]);
     var id=navigation.getParam('id');


Firebase.database().ref(`Dealers/${id}`).once('value').then((data) => {
    if (listenCheck) {
        if (data.val()) {
            setDealer(data.val());
            // console.log("Dealer", dealer);
            setListenCheck(false);
        }
    }
})
Firebase.database().ref(`Dealers/${id}/DealerProducts`).once('value').then((data) => {
    
        if (data.val()) {
            setItems(data.val());
            // console.log("Items", items);
            setListenCheck(false);
        }
    
})

// for(var i=0;i<items.length;i++){
// Firebase.database().ref(`Dealers/${id}/DealerProducts/${i}/images/`).once('value').then((data) => {
    
//         setImages(data.val());
//         setAllImages([...allImages,{imagesDeck}])
//         // console.log("Items", imagesDeck);
//         // console.log("All images",allImages);
// })
// }



Firebase.database().ref(`Dealers/${id}/DealerProducts/0/images/`).once('value').then((data) => {
    
        if (data.val()) {
            setDummy(data.val());
        }
    
})



    return (
        
        <View style={styles.main}>
            <Text style={{ color: 'black', fontSize: 18 ,padding:4}}>{"Dealer Id : " + dealer.id }</Text>
            <Text style={{ color: 'black', fontSize: 18 ,padding:4}}>{"Name : " + dealer.firstName+" "+dealer.lastName }</Text>
            <Text style={{ color: 'black', fontSize: 18 ,padding:4}}>{"Email : " +dealer.email }</Text>
            <Text style={{ color: 'black', fontSize: 18 ,padding:4}}>{"Mobile No. :" + dealer.mobile}</Text>
            
            <FlatList data={items} renderItem={({ item }) =>
			(<View style={styles.card}>
                <SliderBox
						images={dummy}
						autoplay={true}
						sliderBoxHeight={175}
						circleLoop={true}
						resizeMode={'contain'}
						// currentImageEmitter={index => {
						// 	setImageIndex(index)
                        // }}
                         />
                        <Text style={{ color: 'black', fontSize: 18,alignSelf:'center' }}>{item.productName }</Text>
                        <Text style={{ color: 'black', fontSize: 18,alignSelf:'center' }}>{item.productPrice }</Text>
				<Text style={{ color: 'black', fontSize: 18,alignSelf:'center' }}>{item.category }</Text>
                <View style={{flexDirection:'row',width:'100%'}}>
				<View style={styles.card}>
				<TouchableOpacity style={{flexDirection:'row'}}>
                    <Text style={{fontSize:24,paddingLeft:5}}>Discard</Text>
                <AntDesign name="close" size={34} color="red" />
                </TouchableOpacity>
			</View>
                <View style={styles.card}>
				<TouchableOpacity style={{flexDirection:'row'}}>
                <Text style={{fontSize:24,paddingLeft:5}}>Accept</Text>
                <AntDesign name="check" size={34} color="green" />
                </TouchableOpacity>
			</View>
            </View>
            </View>
            
            )}>

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
    card :{
        marginTop:8,
        // height:80,
        borderRadius:6,
        elevation:3,
        flex:1,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,
    }
});