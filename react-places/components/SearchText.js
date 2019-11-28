import React from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet } from 'react-native'

export class SearchText extends React.Component {
	constructor(props) {
		super(props)
		this.searchBar = React.createRef()
	}

	componentDidMount() {
		this.searchBar.current.focus()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFetching !== this.props.isFetching) {
			this.searchBar.current.focus()
		}
	}

	render() {
		const { search, isFetching, updateSearch } = this.props
		return (
			<SearchBar
				ref={this.searchBar}
				lightTheme={true}
				placeholder='Search a place...'
				onChangeText={updateSearch}
				value={search}
				showLoading={isFetching}
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
