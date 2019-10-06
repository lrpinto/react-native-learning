import React from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet } from 'react-native'

export class SearchText extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			search: '',
			showLoading: false
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { showLoading } = this.props
		if (prevProps.showLoading !== showLoading) {
			this.setState({ showLoading })
		}
	}

	updateSearch = search => {
		this.setState({ search })

		const { updateSearch } = this.props
		if (updateSearch) {
			updateSearch(search)
		}
	}

	render() {
		const { search, showLoading } = this.state

		return (
			<SearchBar
				lightTheme={true}
				placeholder='Search an artist...'
				onChangeText={this.updateSearch}
				value={search}
				showLoading={showLoading}
				containerStyle={styles.containerStyle}
				inputContainerStyle={styles.inputContainerStyle}
				inputStyle={styles.inputStyle}
			/>
		)
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: 'white',
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	inputContainerStyle: {
		backgroundColor: 'white'
	},
	inputStyle: {
		backgroundColor: '#f2f2f2',
		borderRadius: 16,
		paddingLeft: 16
	}
})
