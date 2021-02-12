import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert, Modal, Keyboard, SafeAreaView } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig'
import { StatusBar } from 'expo-status-bar';
import { SliderBox } from "react-native-image-slider-box"
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-simple-toast';
import DropDownPicker from 'react-native-dropdown-picker'
import Card from '../shared/AdminCard'

const HomeScreen = () => {

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
	const [categories, setCategories] = useState([]);
	const [deleteImageNames, setDeleteImageNames] = useState([])
	const [showCardModal, setShowCardModel] = useState(false)
	const [header, setHeader] = useState('')
	const [cards, setCards] = useState([])
	const [showImageModal, setShowImageModal] = useState(false)
	const [smallText, setSmallText] = useState('')
	const [bigText, setBigText] = useState('')
	const [image, setImage] = useState(require('../assets/images/add-pic.png'))
	const [cardListenStatus, setCardListenStatus] = useState(true)
	const [isCardChanged, setCardChanged] = useState(false)
	const [drawerItemsCall, setDrawerItemsCall] = useState(true)
	const [productListCall, setProductListCall] = useState(false)
	const [products, setProducts] = useState([])
	const [productImage, setProductImage] = useState('')
	const [cardProduct, setCardProduct] = useState([])
	const [subCategories, setSubCategories] = useState([])
	const [productSubCategory, setProductSubCategory] = useState('')
	const [dropDownSubCat, setDropDownSubCat] = useState([])
	const [disabled, setDisabled] = useState(true)

	Firebase.database().ref('DrawerItemsList/').once('value').then((snapshot) => {
		if (drawerItemsCall) {
			if (snapshot.val()) {
				var cats = [];
				var subCats = [];
				var keys = Object.keys(snapshot.val())
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i]
					var cat = snapshot.val()[key].itemName
					cats.push({ label: cat, value: cat })
					subCats.push(snapshot.val()[key])
				}
				setSubCategories(subCats);
				setCategories(cats);
				setDrawerItemsCall(false)
			}
		}
	})

	Firebase.database().ref(`ProductList/${header}/${productSubCategory}`).once('value').then((snapshot) => {
		if (productListCall) {
			if (snapshot.val()) {
				var prods = [];
				var keys = Object.keys(snapshot.val())
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i]
					var prod = snapshot.val()[key]
					prods.push({ label: prod.productName, value: prod })
				}
				setProducts(prods);
				setDisabled(false);
				setProductListCall(false);
			} else {
				Toast.show('No Products found', Toast.SHORT);
				setProductListCall(false);
			}
		}
	})

	Firebase.database().ref(`/ImagesDeck/`).once('value').then((data) => {
		if (deckListenStatus) {
			if (data.val()) {
				setImagesDeck(data.val())
				setDeckListenStatus(false)
			}
		}
	})

	Firebase.database().ref(`/Cards`).once('value').then((data) => {
		if (cardListenStatus) {
			if (data.val()) {
				setCards(data.val())
				setCardListenStatus(false)
			}
		}
	})

	const DeleteImageHandler = index => {
		console.log("DeleteImageHandler : ", index)
		if (imagesDeck.length >= 0) {
			const imageDeckArray = imagesDeck;
			const imageRef = imageDeckArray.splice(index, 1);
			if (imageRef[0]) {
				const imageName = imageRef[0].imageName;
				setDeleteImageNames([...deleteImageNames, imageName])
				setDeckChanged(true)
				setImagesDeck(imageDeckArray)
			}
		}
	};

	const AddCard = (header) => {
		console.log("AddCard", header)
		if (header.length == 0) {
			Alert.alert("Wait", "Select the category first..",
				[{ text: "Retry", onPress: () => { return } }], { cancelable: true })
		} else {
			let cardFlag = true;
			cards.map(card => {
				if (card.header === header) {
					Toast.show("Category Card already present.", Toast.SHORT);
					cardFlag = false;
				}
			});

			if (cardFlag) {
				setCards([...cards, {
					key: new Date().getTime(),
					images: [],
					header: header
				}])
				setShowCardModel(false)
				setCardChanged(true)
				setHeader('')
			}
		}
	}

	const AddCardContent = (header, prod, image, smallText, bigText) => {
		console.log(header,prod,image,smallText,bigText);
		const cardArray = cards;
		const cardIndex = cardArray.findIndex((card) => card.header === header);
		prod.saleDiscount = bigText + " %";
		prod.salePrice = prod.finalPrice - (parseFloat(bigText) * prod.finalPrice) / 100;
		Firebase.database().ref(`ProductList/${prod.category}/${prod.subCategory}/${prod.key}`).set(prod);
		cardArray[cardIndex].images = [...cardArray[cardIndex].images, {
			key: prod.key,
			image: image,
			textItem: smallText,
			textOff: bigText,
			product: {
				productKey: prod.key,
				category: prod.category,
				subCategory: prod.subCategory
			},
		}];
		setCards(cardArray)
		setCardChanged(true)
		setShowImageModal(false)
		setHeader('')
		setImage(require('../assets/images/add-pic.png'))
		setSmallText('')
		setBigText('')
		setCardProduct([])
		setProductImage('')
		setDisabled(true)
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
		console.log("Index : " + index)
		console.log("Header : " + header)
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
					setDeleteImageNames([...deleteImageNames, imageName]);
					setCardChanged(true)
					setCards(cardArray)
				}
			}
		}]);
	}

	const DeleteCardHandler = (header) => {
		console.log("Delete Card " + header);
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
					setCardChanged(true)
				}
			}
		}]);
	}

	const closeModal = () => { setShowCardModel(false), setShowImageModal(false), setDisabled(true) }

	const populateSubCats = (category) => {
		subCategories.map(subcat => {
			if (subcat.itemName === category) {
				var temp = [];
				var keys = Object.keys(subcat.SubCategories)
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					var entry = subcat.SubCategories[key].subitemName
					temp.push({ label: entry, value: entry })
				}
				setDropDownSubCat(temp);
			}
		})
	}

	function SaveToDatabase() {
		let Imageflag = true;
		if (isDeckChanged) {
			Firebase.database().ref('/ImagesDeck').set(imagesDeck).then(() => {
				setDeckListenStatus(true);
				setDrawerItemsCall(true)
				setDeckChanged(false);
			}).catch((error) => {
				Imageflag = false;
				console.log(error);
				Toast.show('Error occured while updating', Toast.SHORT);
			});
		}

		let CardFlag = true;
		if (isCardChanged) {
			cards.map(card => {
				if (card.images.length == 0) {
					Alert.alert('Card Image Error', `The card with the header ${card.header} does not contain any images. Please add an image to the card`)
					CardFlag = false;
				}
			});
			if (CardFlag) {
				Firebase.database().ref('/Cards').set(cards).then(() => {
					setCardListenStatus(true);
					setCardChanged(false)
					setDrawerItemsCall(true)
				}).catch((error) => {
					CardFlag = false;
					console.log(error);
				});
			}
		}

		if (deleteImageNames.length > 0) {
			console.log("updatedList")
			deleteImageNames.map(imageName => {
				Firebase.storage().ref(imageName).delete().then(() => {
					console.log(`${imageName} has been deleted successfully.`);
				})
			});

			setDeleteImageNames([])
		}
		if (Imageflag && CardFlag) {
			Toast.show('Contents updated', Toast.SHORT);
		}
	}

	return (
		<SafeAreaView style={{ paddingTop: 0, flex: 1, }}>
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
						deleteImage={(index) => { DeleteCardImageHandler(index, card.header) }}
						deleteCard={() => { DeleteCardHandler(card.header) }}
						addImage={() => { setHeader(card.header), populateSubCats(card.header), setShowImageModal(true), setProductImage('') }} />)}

					<TouchableOpacity style={styles.bottomContainer} onPress={() => { setShowCardModel(true) }}>
						<Image source={require('../assets/images/add-card.png')} style={{ height: 60, width: 60 }} />
					</TouchableOpacity>
				</View>

				<Modal
					visible={showCardModal}
					position='center'
					transparent={true}
					onRequestClose={() => closeModal()}>
					<View style={styles.modalContainer}>
						<View style={styles.cardModalScreen}>
							<DropDownPicker style={{ zIndex: 1, marginTop: 10, }}
								items={categories}
								placeholder="Select the product category"
								containerStyle={{ height: 40, margin: 10, }}
								dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
								style={{ backgroundColor: 'white' }}
								labelStyle={{ color: 'blue' }}
								activeLabelStyle={{ color: 'red' }}
								onChangeItem={item => { setHeader(item.value) }}
							/>

							<View style={styles.modalButtonContainer}>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='Cancel' onPress={() => { Keyboard.dismiss(), closeModal() }} />
								</View>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='OK' onPress={() => { Keyboard.dismiss(), AddCard(header) }} />

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
							<DropDownPicker
								items={dropDownSubCat}
								placeholder="Select the product sub category"
								containerStyle={{ height: 40, margin: 10, }}
								dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 20, zIndex: 5 }}
								style={{ backgroundColor: 'white' }}
								labelStyle={{ color: 'blue' }}
								activeLabelStyle={{ color: 'red' }}
								onChangeItem={item => { setProductSubCategory(item.value), setDisabled(true), setProductImage(''), setProducts([]), setProductListCall(true), setCardProduct([]) }}
							/>
							<DropDownPicker
								items={products}
								disabled={disabled}
								placeholder="Select the product "
								containerStyle={{ height: 40, margin: 10, }}
								dropDownStyle={{ backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
								style={{ backgroundColor: 'white' }}
								labelStyle={{ color: 'blue' }}
								activeLabelStyle={{ color: 'red' }}
								onChangeItem={item => { setProductImage(item.value.image.uri), setCardProduct(item.value) }}
							/>
							<Image source={{ uri: productImage }} style={{ height: 80, width: 80, alignSelf: 'center', resizeMode: 'contain' }} />
							<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter Sale Text:</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<TextInput style={styles.modalTextInput} onChangeText={(smallText) => setSmallText(smallText)} value={smallText} />
							</View>
							<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter Sale Discount:</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<TextInput style={styles.modalTextInput} keyboardType='number-pad' onChangeText={(bigText) => setBigText(bigText)} value={bigText} />
							</View>
							<View style={styles.modalButtonContainer}>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='Cancel' onPress={() => closeModal()} />
								</View>
								<View style={{ padding: 10, width: '30%' }}>
									<Button title='OK' onPress={() => {
										if (!image.uri) {
											Toast.show("Pick Image from gallery", Toast.SHORT)
										} else if (productImage.length == 0) {
											Toast.show("Select the Product", Toast.SHORT)
										} else if (!smallText || !bigText) {
											Toast.show("Input sale values", Toast.SHORT)
										} else {
											if (parseFloat(bigText) >= 0 && parseFloat(bigText) < 100) {
												AddCardContent(header, cardProduct, image, smallText, bigText)
											} else
												Toast.show("Input valid discount", Toast.SHORT)
										}

									}} />
								</View>

							</View>
						</View>
					</View>
				</Modal>
			</ScrollView>
			<TouchableOpacity style={styles.saveButton} onPress={() => SaveToDatabase()}>
				<Text style={{ color: 'white' }}>SAVE CHANGES</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	bottomContainer: {
		alignItems: 'center',
		marginVertical: 40,
		marginBottom: 60,
		elevation:5
	},
	iconContainer: {
		flexDirection: 'row',
		padding: 5,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: 'black',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	image: {
		height: 35,
		width: 35,
	},

	imageDeck: {
		height: 175,
		borderColor: 'black',
		borderWidth: 1,
		backgroundColor:'gray'
	},

	saveButton: {
		backgroundColor: 'black',
		padding: 15,
		elevation: 10,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	imageModalScreen: {
		height: 600,
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
		height: 100,
		width: 100,
		marginTop: 20,
		resizeMode: 'contain',
		alignSelf: 'center'
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
		zIndex: 0,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
});