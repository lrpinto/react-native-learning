import axios from 'axios'
import _ from 'lodash'
import Constants from 'expo-constants'

/**
 * Use 10.0.2.2 for default AVD and 10.0.3.2 for Genymotion
 * https://stackoverflow.com/questions/6760585/accessing-localhostport-from-android-emulator
 */
const BASE_URL = `http://10.0.2.2:3000`

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 2000
})

export const searchPlaces = searchText => {
	return axiosInstance.get(`places?q=${searchText}`).then(response => {
		const places = response.data.map(item => item)
		const uniqPlaces = _.uniqBy(places, 'name')
		return uniqPlaces
	})
}

export const getPlaceVisits = placeId => {
	return axiosInstance.get(`visits?place_id=${placeId}`).then(response => {
		const visits = response.data.map(item => item)
		const uniqVisits = _.uniqBy(visits, 'date')
		return uniqVisits
	})
}

export const getMarkers = (selectedId = '') => {
	return axiosInstance.get(`places`).then(response => {
		const markers = response.data.map(item => {
			return {
				latlng: {
					latitude: item.geometry.location.lat,
					longitude: item.geometry.location.lng
				},
				title: item.name,
				description: item.formatted_address,
				color: selectedId === item.id ? '#33cccc' : '#00ff00'
			}
		})
		return markers
	})
}
