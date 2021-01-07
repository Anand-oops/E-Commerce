import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert, Modal } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig'

// const HomeScreen = () => {

//   const {user, logout} = useContext(AuthContext);

//   Firebase.database().ref(`/Admin/${user.uid}`).set({
//     id:user.uid,
//     email:user.email,
//     password:user.providerId,
//     displayName:user.displayName,
//     phoneNumber:user.phoneNumber,
//     })

import { StatusBar } from 'expo-status-bar';
import { SliderBox } from "react-native-image-slider-box"
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-simple-toast';
import Card from '../shared/Card'

const HomeScreen = (props) => {

	const { user } = useContext(AuthContext);

	Firebase.database().ref(`/Admin/${user.uid}`).update({
		id: user.uid,
		email: user.email,
		password: user.providerId,
	})

	const [imagesDeck, setImagesDeck] = useState([])
	const [isDeckChanged, setDeckChanged] = useState(false)
	const [deckListenStatus, setDeckListenStatus] = useState(true)
	const [imageIndex, setImageIndex] = useState(0)
	const [deleteImageNames, setDeleteImageNames] = useState([])
	const [showCardModal, setShowCardModel] = useState(false)
	const [header, setHeader] = useState('')
	const [cards, setCards] = useState([])
	const [showImageModal, setShowImageModal] = useState(false)
	const [smallText, setSmallText] = useState('')
	const [bigText, setBigText] = useState('')
	const [image, setImage] = useState(require('../assets/images/add.png'))
	const [cardListenStatus, setCardListenStatus] = useState(true)
	const [isCardChanged, setCardChanged] = useState(false)



	Firebase.database().ref(`/ImagesDeck/`).once('value').then((data) => {
		if (deckListenStatus) {
			if (data.val()) {
				setImagesDeck(data.val())
				setDeckListenStatus(false)
			}
		}
	})

	Firebase.database().ref(`/Cards`).once('value').then((data) => {
		if(cardListenStatus){
			if (data.val()) {
				setCards(data.val())
				setCardListenStatus(false)
			}
		}
	})

	const DeleteImageHandler = index => {
		if (imagesDeck.length > 0) {
			const imageDeckArray = imagesDeck;
			const imageRef = imageDeckArray.splice(index, 1);
			if (imageRef[0]) {
				const imageName = imageRef[0].imageName;
				setDeleteImageNames([...deleteImageNames, imageName])
				setImagesDeck(imageDeckArray)
			}
		}
	};

	const AddCard = (header) => {
		if (header.length==0) {
			Alert.alert("Wait", "Empty header not allowed",
			[{text:"Retry", onPress:() => {return}}],{cancelable:true})
		}else{
			setCards([...cards, {
				key: new Date().getTime(),
				images: [],
				header: header
			}])
			setShowCardModel(false),
			setHeader('')
		}
		
	}

	const AddCardContent = (header, image, smallText, bigText) => {
		console.log(header,smallText,bigText)
		const cardArray = cards;
		const cardIndex = cardArray.findIndex((card) => card.header === header);
		console.log(cardIndex)
		if (image.uri) {
			cardArray[cardIndex].images = [...cardArray[cardIndex].images, {
				key: new Date().getTime(),
				image: image,
				textItem: smallText,
				textOff: bigText,
			}];
			setCards(cardArray)
			setShowImageModal(false)
			setHeader('')
			setImage(require('../assets/images/add.png'))
			setSmallText('')
			setBigText('')
		}
		else {
			Alert.alert('Image Not Found', 'Please pick an image from the gallery');
		}
	}

	const AddImageHandler = async (key) => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.cancelled === true) {
			return;
		}
		let URI = pickerResult.uri;
		const imageName = URI.substring(URI.lastIndexOf('/') + 1);
		const response = await fetch(URI);
		const blob = await response.blob();
		console.log(imageName)
		Firebase.storage()
			.ref(`${imageName}`)
			.put(blob)
			.then((snapshot) => {
				console.log(`${imageName} has been successfully uploaded.`);
				snapshot.ref.getDownloadURL().then((url) => {
					if (key == 'deck') {
						setDeckChanged(true);
						setImagesDeck([...imagesDeck, { imageName: imageName, uri: url }])
					}
					else if (key == 'cardImage') {
						setCardChanged(true);
						setImage({
							imageName: imageName,
							uri: url,
						})
					}
				});
			})
			.catch((e) => console.log('uploading image error', e));

	};

	const DeleteCardImageHandler = (index, header) => {
		console.log("Index : "+index)
		console.log("Header : "+header)
		Alert.alert('Confirm Delete', 'Do you want to delete this item?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                const cardArray = cards;
                const cardIndex = cardArray.findIndex(card => card.header === header);
                const imageRef = cardArray[cardIndex].images.splice(index, 1);
                console.log(imageRef);
                if (imageRef) {
					const imageName = imageRef[0].image.imageName;
					setDeleteImageNames([...deleteImageNames,imageName]);
					setCards(cardArray)
                }
            }
        }]);
	}

	const DeleteCardHandler = (header) => {
		console.log("Delete Card "+ header);
        Alert.alert('Confirm Delete', 'Do you want to delete this card?', [{
            text: 'Cancel',
            style: 'cancel',
        }, {
            text: 'OK',
            onPress: () => {
                const cardArray = cards;
                const cardIndex = cardArray.findIndex(card => card.header === header);
                const card = cardArray.splice(cardIndex, 1);
				const Images = card[0].images;
                if (Images) {
					Images.map(Image => {
						setDeleteImageNames([...deleteImageNames, Image.image.imageName])
					})
				setCards(cardArray)
                }
            }
        }]);
    }

	const closeModal = () => { setShowCardModel(false), setShowImageModal(false) }

	function SaveToDatabase() {
		let Imageflag = true;
		if (isDeckChanged) {
			Firebase.database().ref('/ImagesDeck').set(imagesDeck).then(() => {
				setDeckListenStatus(true);
				setDeckChanged(false);
			}).catch((error) => {
				Imageflag = false;
				console.log(error);
				Toast.show('Error occured while updating', Toast.SHORT);
			});
		}

		let CardFlag = true;
		if (cards.length>0) {
			cards.map(card => {
                if (card.images.length == 0) {
                    Alert.alert('Card Image Error', `The card with the header ${card.header} does not contain any images. Please add an image to the card`)
                    CardFlag = false;
                }
            });
            if (isCardChanged) {
                Firebase.database().ref('/Cards').set(cards).then(() => {
					setCardListenStatus(true);
					setCardChanged(false)
                }).catch((error) => {
					CardFlag=false;
                    console.log(error);
                });
            }
		}
		
		if (deleteImageNames.length > 0) {
			console.log("updatedList")
			deleteImageNames.map(imageName =>{
				Firebase.storage().ref(imageName).delete().then(() => {
					console.log(`${imageName} has been deleted successfully.`);
					})
				});

				Firebase.database().ref('/ImagesDeck').set(imagesDeck).then(() => {
					setDeckListenStatus(true);
					setDeckChanged(false);
				}).catch((e) => {
					Imageflag = false
					console.log('error on image deletion ', e)
					Toast.show('Error occured while updating', Toast.SHORT); 
				});

				Firebase.database().ref('/Cards').set(cards).then(() => {
					setCardListenStatus(true)
					setCardChanged(false)
				}).catch((e) => {
					CardFlag = false
					console.log('error on Card image deletion ',e)
					Toast.show('Error occured while updating',Toast.SHORT);
				});

			setDeleteImageNames([])
		}
		if (Imageflag && CardFlag) {
			Toast.show('Contents updated', Toast.SHORT);
		}
	}

	return (
		<View style={{ paddingTop: 0, flex: 1, }}>
			<StatusBar style="light" />
			<ScrollView keyboardShouldPersistTaps='always'>
				<View style={styles.iconContainer}>

					<TouchableOpacity onPress={() => DeleteImageHandler(imageIndex)}>
						<Image source={require('../assets/images/delete.png')} style={styles.image} />
					</TouchableOpacity>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}> Image Deck </Text>
					<TouchableOpacity onPress={() => AddImageHandler('deck')}>
						<Image source={require('../assets/images/add.png')} style={styles.image} />
					</TouchableOpacity>

				</View>
				<View style={styles.imageDeck}>
					<SliderBox
						images={imagesDeck}
						autoplay={true}
						sliderBoxHeight={175}
						circleLoop={true}
						resizeMode={'contain'}
						currentImageEmitter={index => {
							setImageIndex(index)
						}} />
				</View>
				<View>
					{cards.map(card => <Card key={card.key} images={card.images} header={card.header} 
					deleteImage={() => { DeleteCardImageHandler()}}
					deleteCard={() => { DeleteCardHandler(card.header) }}
					addImage={() => {setHeader(card.header), setShowImageModal(true) }}  />)}

					<TouchableOpacity style={styles.bottomContainer} onPress={() => setShowCardModel(true)}>
						<Image source={require('../assets/images/add.png')} style={{ height: 50, width: 50, }} />
					</TouchableOpacity>
				</View>

				<Modal
					visible={showCardModal}
					position='center'
					transparent={true}
					onRequestClose={() => closeModal()}>
					<View style={styles.modalContainer}>
						<View style={styles.cardModalScreen}>
							<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter Card Header Name:</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<TextInput style={styles.modalTextInput} onChangeText={(header) => setHeader(header)} value={header} />
							</View>
							<View style={styles.modalButtonContainer}>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='Cancel' onPress={() => closeModal()} />
								</View>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='OK' onPress={() => AddCard(header)} />

								</View>
							</View>
						</View>
					</View>
				</Modal>

				<Modal
					visible={showImageModal}
					position='center'
					transparent={true}
					onRequestClose={() => closeModal()}>
					<View style={styles.modalContainer}>
						<View style={styles.imageModalScreen}>
							<TouchableOpacity onPress={() => AddImageHandler('cardImage')} style={styles.cardImageContainer}>
								<Image source={image} style={styles.cardImage} />
							</TouchableOpacity>
							<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter SmallText:</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<TextInput style={styles.modalTextInput} onChangeText={(smallText) => setSmallText(smallText)} value={smallText} />
							</View>
							<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter BigText:</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<TextInput style={styles.modalTextInput} onChangeText={(bigText) => setBigText(bigText)} value={bigText} />
							</View>
							<View style={styles.modalButtonContainer}>
							<View style={{ padding: 10, width: '30%' }}>
									<Button title='Cancel' onPress={() => closeModal()} />
								</View>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='OK' onPress={() => AddCardContent(header, image, smallText, bigText)} />
								</View>
								
							</View>
						</View>
					</View>
				</Modal>

			</ScrollView>
			<TouchableOpacity style={styles.saveButton} onPress={() => SaveToDatabase()}>
				<Text style={{ color: 'white' }}>SAVE CHANGES</Text>
			</TouchableOpacity>
		</View>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	bottomContainer: {
		alignItems: 'center',
		marginVertical: 40,
		marginBottom: 60,
	},
	iconContainer: {
		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: 'black',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	image: {
		height: 30,
		width: 30,
		paddingHorizontal: 10
	},

	imageDeck: {
		elevation: 5,
		height: 175,
		borderColor: 'black',
		borderWidth: 1,
	},

	saveButton: {
		backgroundColor: '#ec2F4B',
		padding: 15,
		elevation: 10,
		borderRadius: 10,
		margin: 5,
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	imageModalScreen: {
		height: 400,
		width: '85%',
		borderRadius: 20,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white'
	},

	cardImageContainer: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},

	cardImage: {
		height: 80,
		width: 80,
		marginVertical: 20,
		resizeMode: 'contain',
		justifyContent: 'center',
	},

	cardModalScreen: {
		height: 200,
		width: '85%',
		borderRadius: 15,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white'
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
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
});