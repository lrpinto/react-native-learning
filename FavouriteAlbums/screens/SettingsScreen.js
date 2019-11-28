import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

export default function SettingsScreen(props) {
	/**
	 * Go ahead and delete ExpoConfigView and replace it with your content;
	 * we just wanted to give you a quick view of your config.
	 */
	return (
		<View>
			<Button
				title='Navigate to Storage'
				onPress={() => {
					props.navigation.navigate('Storage')
				}}
			></Button>
			<ExpoConfigView />
		</View>
	)
}

SettingsScreen.navigationOptions = {
	title: 'app.json'
}
