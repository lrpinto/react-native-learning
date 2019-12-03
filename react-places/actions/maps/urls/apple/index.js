const DIRECTIONS_URL = 'http://maps.apple.com/?'

export const getDirectionsUrl = marker => {
	const daddr = encodeURI(`${marker.description}`)
	const url = `${DIRECTIONS_URL}daddr=${daddr}&dirflg=d`
	console.log(url)
	return url
}
