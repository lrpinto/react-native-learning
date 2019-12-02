import React from 'react'
import { ScrollView, StyleSheet, View, Linking } from 'react-native'
import * as actions from '../actions/places'
import { Avatar, Text, Icon, Divider, ListItem } from 'react-native-elements'

export default class PlaceScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			visits: []
		}
	}

	componentDidMount() {
		const place = this.props.navigation.getParam('place', {})
		actions
			.getPlaceVisits(place.place_id)
			.then(visits => this.setState({ visits }))
			.catch(error => {
				console.error(error)
				this.setState({ visits: [] })
			})
	}

	rendervisits() {
		const { visits } = this.state
		if (visits && visits.length > 0) {
			return visits.map((visit, index) => {
				return (
					<ListItem
						key={index}
						title={visit.title}
						leftIcon={{ name: 'eye' }}
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
								source={{ uri: place.icon }}
							></Avatar>
						</View>
						<View style={styles.headerRight}>
							<Text style={styles.mainText}>{place.name}</Text>
							<Icon
								raised
								name='eye'
								type='font-awesome'
								color='#00ff00'
								size={30}
								onPress={() => {
									Linking.openURL(this.state.visits[0].preview)
								}}
							/>
						</View>
					</View>
					<Divider style={{ height: 3, backgroundColor: '#00ff00' }} />
					<View style={{ paddingTop: 0, marginTop: 0 }}>
						{this.rendervisits()}
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
