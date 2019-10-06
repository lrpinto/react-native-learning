import React from 'react'
import { StyleSheet, View, Button } from 'react-native'

export default function HomeScreen(props) {
	return (
		<View style={styles.container}>
			<Button
				title='Nagivate to Albums'
				onPress={() => {
					props.navigation.navigate('Albums')
				}}
			/>
		</View>
	)
}

/**
 * Home Screen Navigation Options
 */
HomeScreen.navigationOptions = {
	title: 'Home'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
