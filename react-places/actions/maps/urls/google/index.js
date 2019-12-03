const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&'

export const getDirectionsUrl = marker => {
	const destination = encodeURI(`${marker.title}, ${marker.description}`)
	const destination_place_id = marker.place_id
	const url = `${DIRECTIONS_URL}destination=${destination}&destination_place_id=${destination_place_id}&travelmode=driving`
	console.log(url)
	return url
}
