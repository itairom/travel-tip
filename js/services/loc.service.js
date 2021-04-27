export const locService = {
    getLocs,
    setLocs,
    getGeoAddress,
    getGeoLocation,
    setGeoAddress,
    setGeoLocation
}
import { utilService } from './util.service.js';
import { axiosService } from './axios.service.js'

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// testApi(axiosService.askForGeoLocation(32.047104, 34.832384))
//     .then(res =>
//         console.log(res))

// getGeoLocation()

function getGeoLocation(lat, lng) {
    return axiosService.askForGeoLocation(lat, lng)
        .then(setGeoLocation)
}

function setGeoLocation(res) {
    console.log(res.results[0].address_components[2].long_name);
    return res.results[0].address_components[2].long_name
}

// getGeoAddress('yafo')

function getGeoAddress(address) {
    return axiosService.askForGeoAdress(address)
        .then(setGeoAddress)
}

function setGeoAddress(res) {
    console.log(res.results[0].geometry.location);
    return res.results[0].geometry.location
}

var locs = [
    { name: 'Tel-Aviv', lat: 32.047104, lng: 34.832384, createdAt: date, updatedAt: 10, id: 345 },
    { name: 'Ramat Hasharon', lat: 32.047201, lng: 34.832581, createdAt: date, updatedAt: 9, id: 890 }
]

function setLocs(loc) {

    console.log(loc);
    const location = {

        lat: loc.lat,
        lng: loc.lng,

        createdAt: new Date().getDate(),
        id: utilService.makeId(),
        // name: getGeoLocation(loc.lat, loc.lng)
    }

    getGeoLocation(loc.lat, loc.lng)
        .then(res => location.name = res)

    locs.push(location)

}



function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}