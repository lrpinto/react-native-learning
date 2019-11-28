import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Text, Icon, Card } from 'react-native-elements'

const menuList = [
	{
		title: 'Favourite Places',
		subtitle: 'Access your favourite places',
		icon: 'star',
		navigateTo: 'Places'
	},
	{
		title: 'Search Places',
		subtitle: 'Search new favourite places',
		icon: 'map',
		navigateTo: 'Map'
	},
	{
		title: 'Settings',
		subtitle: 'Customise your app',
		icon: 'cog',
		navigateTo: '#'
	}
]

export default function HomeScreen(props) {
	return (
		<ScrollView style={styles.container}>
			<View style={{ backgroundColor: '#cacaca', marginTop: 0 }}>
				{menuList.map((item, index) => {
					return (
						<Card key={index} title={item.title}>
							<View style={styles.cardView}>
								<Text style={{ marginTop: 10 }}>{item.subtitle}</Text>
								<Icon
									raised
									name={item.icon}
									type='font-awesome'
									color={'#00ff00'}
									size={30}
									onPress={() => {
										props.navigation.navigate(item.navigateTo)
									}}
								></Icon>
							</View>
						</Card>
					)
				})}
			</View>
		</ScrollView>
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
	},
	cardView: {
		alignItems: 'center'
	}
})
