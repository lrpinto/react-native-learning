import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as actions from '../actions'
import { Avatar, Text, Icon, Divider, ListItem } from 'react-native-elements'

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
			.then(tracks => this.setState({ tracks }))
			.catch(error => {
				console.error(error)
				this.setState({ tracks: [] })
			})
	}

	renderTracks() {
		const { tracks } = this.state
		if (tracks && tracks.length > 0) {
			return tracks.map((track, index) => {
				return (
					<ListItem
						key={index}
						title={track.title}
						leftIcon={{ name: 'play-arrow' }}
						onPress={() => {
							console.error('Not Implemented')
						}}
						rightIcon={{
							raised: true,
							name: 'star',
							type: 'fontawesome',
							color: '#f50',
							onPress: () => {}
						}}
						bottomDivider
					></ListItem>
				)
			})
		}
	}

	renderAlbumDetailView() {
		const album = this.props.navigation.getParam('album', {})
		const artist = this.props.navigation.getParam('artist', '')
		if (album.id) {
			return (
				<ScrollView style={styles.container}>
					<View>
						<View>
							<Avatar
								xlarge
								rounded
								source={{ uri: album.cover_medium }}
							></Avatar>
						</View>
						<Text h4>{album.title}</Text>
						<Text h4>{artist}</Text>
						<Icon
							raised
							name='play'
							type='font-awesome'
							color='#f50'
							size={30}
							onPress={() => {}}
						/>
					</View>
					<Divider style={{ backgroundColor: 'grey' }} />
					<View>{this.renderTracks()}</View>
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
		return this.renderAlbumDetailView()
	}
}

AlbumDetailScreen.navigationOptions = {
	title: 'Album Detail'
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
		padding: '20'
	},
	avatar: {
		flex: 1,
		marginRight: 20
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
		fontSize: 17
	},
	subText: {
		color: '#3a3a3a',
		fontSize: 17
	}
})
