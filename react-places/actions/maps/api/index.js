import axios from 'axios'
import _ from 'lodash'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

const API_KEY = GOOGLE_MAPS_API_KEY
const BASE_URL = 'https://maps.googleapis.com/maps/api'

const axiosInstance = axios.create({
	baseURL: `${BASE_URL}`,
	timeout: 2000,
	headers: {
		'x-rapidapi-key': API_KEY
	}
})
