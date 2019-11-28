import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CardList } from '../components/CardList'
import { SearchText } from '../components/SearchText'
import * as actions from '../actions/maps'
import { Icon } from 'react-native-elements'
import _ from 'lodash'

export default class PlacesScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			places: [],
			isFetching: false,
			place: ''
		}

		this.debounceSearch = _.debounce(this.searchPlaces, 50)
	}

	componentDidUpdate(previousProps, previousState) {
		const { place } = this.state
		if (previousState.place !== place && place) {
			this.debounceSearch(place)
		}
	}

	updateSearch = place => {
		if (place !== '') {
			this.setState({ place: place, isFetching: true })
		} else {
			this.setState({ place: place, isFetching: false, places: [] })
		}
	}

	searchPlaces = place => {
		actions
			.searchPlaces(place)
			.then(places => this.setState({ places, isFetching: false }))
			.catch(error => {
				console.error(error)
				this.setState({ places: [], isFetching: false })
			})
	}

	renderBottomNavigation = place => {
		return (
			<View style={styles.placeView}>
				<Icon
					onPress={() => {}}
					raised
					name='map-pin'
					type='font-awesome'
					color='#00ff00'
					size={30}
				/>
				<Icon
					onPress={() => {}}
					raised
					name='map-marked-alt'
					type='font-awesome'
					color='#00ff00'
					size={30}
				/>
				<Icon
					onPress={() => {
						this.props.navigation.navigate('Place', { place })
					}}
					raised
					name='info'
					type='font-awesome'
					color='#00ff00'
					size={30}
				/>
			</View>
		)
	}

	renderPlaceView() {
		const { places, isFetching, place } = this.state
		return (
			<ScrollView style={styles.container}>
				<SearchText
					search={place}
					updateSearch={this.updateSearch}
					isFetching={isFetching}
				></SearchText>
				<CardList
					data={places}
					itemsName='places'
					titleKey='title'
					imageKey='cover_big'
					bottomView={this.renderBottomNavigation}
				></CardList>
			</ScrollView>
		)
	}

	render() {
		return this.renderPlaceView()
	}
}

PlacesScreen.navigationOptions = {
	title: 'Places'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 16,
		backgroundColor: '#fff'
	},
	placeView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
