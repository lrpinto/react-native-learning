import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { MapView } from 'react-native-maps'

export default class MapScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {}

	renderMapView() {
		return (
			<View style={styles.container}>
				<Text>{'Map component will be here'}</Text>
				{
					// <MapView style={styles.mapStyle} />
				}
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
