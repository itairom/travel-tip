export const locService = {
    getLocs,
    setLocs
}
import { utilService } from './util.service.js'

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var locs = [
    { name: 'Tel-Aviv', lat: 32.047104, lng: 34.832384, createdAt: date, updatedAt: 10, id: 345 },
    { name: 'Ramat Hasharon', lat: 32.047201, lng: 34.832581, createdAt: date, updatedAt: 9, id: 890 }
]

function setLocs(loc) {

    locs.push({
        name: 'temp',
        lat: loc.lat,
        lng: loc.lng,
        createdAt: date,
        updatedAt:date,
        id: utilService.makeId()

    })

    // console.log('locs:', locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}