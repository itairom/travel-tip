export const axiosService = { askForGeoLocation }


function askForGeoLocation(lat, lng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE`)
        .then(res => {
            return res.data;
        })
}