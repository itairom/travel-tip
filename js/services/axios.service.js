export const axiosService = { askForGeoLocation, askForGeoAdress }
const API_KEY = 'AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE'

function askForGeoLocation(lat, lng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE`)
        .then(res => {
            return res.data;
        })
}

function askForGeoAdress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE`)
        .then(res => {
            return res.data;
        })
}


// https://maps.googleapis.com/maps/api/geocode/json?address=tel-aviv,+CA&key=AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE