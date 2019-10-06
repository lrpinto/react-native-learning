import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Icon, Text } from 'react-native-elements'

export class CardList extends React.Component {
	constructor(props) {
		super()
	}

	renderData() {
		const { data, titleKey, imageKey, itemsName, bottomView } = this.props

		const cards = data.map((item, index) => {
			return (
				<Card
					title={item[titleKey]}
					image={{ uri: item[imageKey] }}
					key={index}
				>
					{bottomView(item)}
				</Card>
			)
		})

		return (
			<React.Fragment>
				<Text style={styles.count}>{`${data.length} ${itemsName}`}</Text>
				{cards}
			</React.Fragment>
		)
	}

	renderNoItems() {
		const { itemsName } = this.props
		return (
			<View>
				<Text style={styles.count}>{`0 ${itemsName}`}</Text>
			</View>
		)
	}

	renderLoading() {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	render() {
		const { data } = this.props
		if (data && data.length > 0) {
			return this.renderData()
		} else if (data && data.length === 0) {
			return this.renderNoItems()
		} else {
			return this.renderLoading()
		}
	}
}

const styles = StyleSheet.create({
	count: {
		fontStyle: 'italic',
		paddingLeft: 16
	}
})
