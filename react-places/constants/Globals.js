/**
 * A region is defined by the center coordinates and the span of coordinates to display.
 */
const regions = {
	codeArcs: {
		latitude: 55.069945,
		longitude: -3.595272,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05
	}
}

const markers = [
	{
		latlng: {
			latitude: 55.069945,
			longitude: -3.595272
		},
		title: 'CodeArcs',
		description: 'We Create Software to Scale',
		color: '#00ff00'
	}
]

export default {
	regions,
	markers
}
