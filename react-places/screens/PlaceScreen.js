import React from 'react'
import { ScrollView, StyleSheet, View, Linking } from 'react-native'
import * as actions from '../actions'
import { Avatar, Text, Icon, Divider, ListItem } from 'react-native-elements'

export default class PlaceScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			notes: []
		}
	}

	componentDidMount() {
		const place = this.props.navigation.getParam('place', {})
		actions
			.getPlaceNotes(place.id)
			.then(notes => this.setState({ notes }))
			.catch(error => {
				console.error(error)
				this.setState({ notes: [] })
			})
	}

	renderNotes() {
		const { notes } = this.state
		if (notes && notes.length > 0) {
			return notes.map((note, index) => {
				return (
					<ListItem
						key={index}
						title={note.title}
						leftIcon={{ name: 'eye' }}
						onPress={() => {
							Linking.openURL(note.preview)
						}}
						rightIcon={{
							raised: true,
							name: 'star',
							type: 'fontawesome',
							color: '#00ff00',
							onPress: () => {}
						}}
						bottomDivider
					></ListItem>
				)
			})
		}
	}

	renderPlaceView() {
		const place = this.props.navigation.getParam('place', {})

		if (place.id) {
			return (
				<ScrollView style={styles.container}>
					<View style={styles.header}>
						<View style={styles.avatar}>
							<Avatar
								size='xlarge'
								rounded
								source={{ uri: place.cover_medium }}
							></Avatar>
						</View>
						<View style={styles.headerRight}>
							<Text style={styles.mainText}>{place.title}</Text>
							<Icon
								raised
								name='play'
								type='font-awesome'
								color='#00ff00'
								size={30}
								onPress={() => {
									Linking.openURL(this.state.notes[0].preview)
								}}
							/>
						</View>
					</View>
					<Divider style={{ height: 3, backgroundColor: '#00ff00' }} />
					<View style={{ paddingTop: 0, marginTop: 0 }}>
						{this.renderNotes()}
					</View>
				</ScrollView>
			)
		} else {
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			)
		}
	}

	render() {
		return this.renderPlaceView()
	}
}

PlaceScreen.navigationOptions = {
	title: 'Place'
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		padding: 20
	},
	avatar: {
		flex: 1,
		marginRight: 10
	},
	headerRight: {
		flex: 1,
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		flexDirection: 'column'
	},
	mainText: {
		fontWeight: 'bold',
		color: '#3a3a3a',
		fontSize: 18
	},
	subText: {
		fontWeight: 'normal',
		color: '#3a3a3a',
		fontSize: 18
	}
})
