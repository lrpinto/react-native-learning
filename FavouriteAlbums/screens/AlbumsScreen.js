import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CardList } from '../components/CardList'
import { SearchText } from '../components/SearchText'
import * as actions from '../actions'
import { Icon } from 'react-native-elements'

export default class AlbumsScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			albums: [],
			showLoading: false
		}
	}

	searchTracks = search => {
		this.setState({ showLoading: true })
		actions
			.searchTracks(search)
			.then(albums => this.setState({ albums, showLoading: false }))
			.catch(error => this.setState({ albums: [], showLoading: false }))
	}

	renderBottomNavigation = album => {
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
						this.props.navigation.navigate('AlbumDetail', { album })
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
		const { albums, showLoading } = this.state

		return (
			<ScrollView style={styles.container}>
				<SearchText
					updateSearch={this.searchTracks}
					showLoading={showLoading}
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
