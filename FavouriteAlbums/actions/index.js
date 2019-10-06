import axios from 'axios'
import _ from 'lodash'

const API_KEY = '593cd5bbdcmsh9a271a2fdc456c0p1a3e2ejsn268052847da4'

const axiosInstance = axios.create({
	baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
	timeout: 2000,
	headers: {
		'x-rapidapi-key': API_KEY
	}
})

export const searchTracks = singerName => {
	return axiosInstance.get(`search?q=${singerName}`).then(response => {
		const albums = response.data.data.map(item => item.album)
		const uniqAlbums = _.uniqBy(albums, 'title')
		return uniqAlbums
	})
}

export const getAlbumTracks = albumId => {
	return axiosInstance.get(`album/${albumId}`).then(response => {
		const tracks = response.data.tracks.data
		return tracks
	})
}
