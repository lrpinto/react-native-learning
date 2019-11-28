import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import MapView from 'react-native-maps'
import * as actions from '../actions/maps/index'
import Globals from '../constants/Globals'
import _ from 'lodash'

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			region: Globals.regions.codeArcsCords
		}

		this.debounceOnRegionChange = _.debounce(this.onRegionChange, 50)
	}

	onRegionChange = region => {
		console.log(region)
		this.setState({ region })
	}

	renderMapView() {
		const { region, loaded } = this.state
		return (
			<View style={styles.container}>
				<MapView
					style={styles.mapStyle}
					initialRegion={region}
					onRegionChange={this.debounceOnRegionChange}
				/>
			</View>
		)
	}

	render() {
		return this.renderMapView()
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
