import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function StorageScreen() {
	return (
		<ScrollView style={styles.container}>
			<Text>I am a storage screen</Text>
		</ScrollView>
	)
}

StorageScreen.navigationOptions = {
	title: 'Storage'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff'
	}
})
