import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CardList } from '../components/CardList'
import { SearchText } from '../components/SearchText'
import * as actions from '../actions'
import { Icon } from 'react-native-elements'
import _ from 'lodash'

export default class AlbumsScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			albums: [],
			isFetching: false,
			artist: ''
		}

		this.debounceSearch = _.debounce(this.searchTracks, 50)
	}

	componentDidUpdate(previousProps, previousState) {
		const { artist } = this.state
		if (previousState.artist !== artist && artist) {
			this.debounceSearch(artist)
		}
	}

	updateSearch = artist => {
		if (artist !== '') {
			this.setState({ artist: artist, isFetching: true })
		} else {
			this.setState({ artist: artist, isFetching: false, albums: [] })
		}
	}

	searchTracks = artist => {
		actions
			.searchTracks(artist)
			.then(albums => this.setState({ albums, isFetching: false }))
			.catch(error => {
				console.error(error)
				this.setState({ albums: [], isFetching: false })
			})
	}

	renderBottomNavigation = album => {
		const { artist } = this.state
		return (
			<View style={styles.albumView}>
				<Icon
					onPress={() => {}}
					raised
					name='play'
					type='font-awesome'
					color='#f50'
					size={30}
				/>
				<Icon
					onPress={() => {
						this.props.navigation.navigate('AlbumDetail', { album, artist })
					}}
					raised
					name='info'
					type='font-awesome'
					color='#f50'
					size={30}
				/>
				<Icon
					onPress={() => {}}
					raised
					name='thumbs-up'
					type='font-awesome'
					color='#f50'
					size={30}
				/>
			</View>
		)
	}

	renderAlbumView() {
		const { albums, isFetching, artist } = this.state
		return (
			<ScrollView style={styles.container}>
				<SearchText
					search={artist}
					updateSearch={this.updateSearch}
					isFetching={isFetching}
				></SearchText>
				<CardList
					data={albums}
					itemsName='albums'
					titleKey='title'
					imageKey='cover_big'
					bottomView={this.renderBottomNavigation}
				></CardList>
			</ScrollView>
		)
	}

	render() {
		debugger
		return this.renderAlbumView()
	}
}

AlbumsScreen.navigationOptions = {
	title: 'Albums'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 16,
		backgroundColor: '#fff'
	},
	albumView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
