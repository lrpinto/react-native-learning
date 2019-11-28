import axios from 'axios'
import _ from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

const API_KEY = GOOGLE_MAPS_API_KEY

const axiosInstance = axios.create({
	baseURL: 'https://nodomain.com',
	timeout: 2000,
	headers: {
		'x-rapidapi-key': API_KEY
	}
})

export const searchPlaces = searchText => {
	return axiosInstance.get(`search?q=${searchText}`).then(response => {
		const places = response.data.data.map(item => item.place)
		const uniqAlbums = _.uniqBy(places, 'title')
		return uniqAlbums
	})
}

export const getPlaceNotes = placeId => {
	return axiosInstance.get(`place/${placeId}/notesyar`).then(response => {
		return response.data.notes
	})
}

// Persisting data
export const storeData = async (key, value) => {
	debugger
	const stringifyValue = JSON.stringify(value)

	try {
		await AsyncStorage.setItem(key, stringifyValue)
	} catch (error) {
		// Error saving data
	}
}

// Fetching data
export const retrieveData = async key => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			// We have data!!
			debugger
			const parsedValue = JSON.parse(value)
			return JSON.parse(value)
		}
	} catch (error) {
		// Error retrieving data
	}
}

/**
 * Given an array of coordinates coords this function returns the region (lat, lng and deltas) to contain those coordinates.
 * ref. https://github.com/react-native-community/react-native-maps/issues/505#issuecomment-243423775
 * @param { latitude: X, longitude: Y } points
 */
export function getRegionForCoordinates(points) {
	debugger
	// points should be an array of { latitude: X, longitude: Y }
	let minX,
		maxX,
		minY,
		maxY

		// init first point
	;(point => {
		minX = point.latitude
		maxX = point.latitude
		minY = point.longitude
		maxY = point.longitude
	})(points[0])

	// calculate rect
	points.map(point => {
		minX = Math.min(minX, point.latitude)
		maxX = Math.max(maxX, point.latitude)
		minY = Math.min(minY, point.longitude)
		maxY = Math.max(maxY, point.longitude)
	})

	const midX = (minX + maxX) / 2
	const midY = (minY + maxY) / 2
	const deltaX = maxX - minX
	const deltaY = maxY - minY

	return {
		latitude: midX,
		longitude: midY,
		latitudeDelta: deltaX,
		longitudeDelta: deltaY
	}
}
