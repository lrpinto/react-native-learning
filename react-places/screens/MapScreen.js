import React from 'react'
import { Linking } from 'expo'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps'
import * as places from '../actions/places'
import * as googleMapsUrls from '../actions/maps/urls/google'
import * as appleMapsUrls from '../actions/maps/urls/apple'
import Globals from '../constants/Globals'
import _ from 'lodash'

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			region: Globals.regions.codeArcs,
			markers: [],
			isFetching: false
		}

		this.debounceOnRegionChange = _.debounce(this.onRegionChange, 50)
		this.debounceGetMarkers = _.debounce(this.getMarkers, 50)
	}

	componentDidMount() {
		this.setState({ isFetching: true }, this.getMarkers)
	}

	getMarkers = () => {
		const place = this.props.navigation.getParam('place', {})
		const region = { ...this.state.region }

		if (place.id) {
			region.latitude = place.geometry.location.lat
			region.longitude = place.geometry.location.lng
		}

		places
			.getMarkers(place.id)
			.then(markers => this.setState({ markers, isFetching: false, region }))
			.catch(error => {
				console.error(error)
				this.setState({ markers: [], isFetching: false })
			})
	}

	onRegionChange = region => {
		this.setState({ region })
	}

	onCalloutPress = marker => {
		if (Platform.OS === 'ios') {
			Linking.openURL(appleMapsUrls.getDirectionsUrl(marker))
		} else {
			Linking.openURL(googleMapsUrls.getDirectionsUrl(marker))
		}
	}

	renderCalloutView(marker) {
		return (
			<Callout onPress={() => this.onCalloutPress(marker)}>
				<View style={styles.container}>
					<Text h4>{marker.title}</Text>
					<Text>{marker.description}</Text>
					<Text>{'Click Me to View Directions'}</Text>
				</View>
			</Callout>
		)
	}

	renderMapMarkers() {
		const { markers } = this.state
		return markers.map((marker, index) => {
			return (
				<Marker key={index} coordinate={marker.latlng} pinColor={marker.color}>
					{this.renderCalloutView(marker)}
				</Marker>
			)
		})
	}

	renderMapView() {
		const { region } = this.state
		return (
			<View style={styles.container}>
				<MapView
					style={styles.mapStyle}
					region={region}
					onRegionChange={this.debounceOnRegionChange}
				>
					{this.renderMapMarkers()}
				</MapView>
			</View>
		)
	}

	renderLoadingView() {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		)
	}

	render() {
		const { isFetching } = this.state

		if (isFetching) {
			return this.renderLoadingView()
		} else {
			return this.renderMapView()
		}
	}
}

MapScreen.navigationOptions = {
	title: 'Map'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	}
})
