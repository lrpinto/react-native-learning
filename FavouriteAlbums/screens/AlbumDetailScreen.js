import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import * as actions from '../actions'

export default class AlbumDetailScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tracks: []
		}
	}

	componentDidMount() {
		const album = this.props.navigation.getParam('album', {})
		actions
			.getAlbumTracks(album.id)
			.then(tracks => {
				this.setState(tracks)
			})
			.catch(error => this.setState({ tracks: [] }))
	}

	renderAlbumDetailView() {
		const album = this.props.navigation.getParam('album', {})
		return (
			<ScrollView style={styles.container}>
				<Text>{album.title}</Text>
			</ScrollView>
		)
	}

	render() {
		return this.renderAlbumDetailView()
	}
}

AlbumDetailScreen.navigationOptions = {
	title: 'Album Detail'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 16,
		backgroundColor: '#fff'
	},
	albumDetailView: {
		flexDirection: 'column'
	}
})
