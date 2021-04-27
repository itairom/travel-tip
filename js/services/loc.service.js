export const locService = {
    getLocs,
    setLocs
}
import { utilService } from './util.service.js'


var locs = [
    { name: 'Tel-Aviv', lat: 32.047104, lng: 34.832384, createdAt: new Date().getDate(), updatedAt: 10, id: 345 },
    { name: 'Ramat Hasharon', lat: 32.047201, lng: 34.832581, createdAt: new Date(), updatedAt: 9, id: 890 }
]

function setLocs(loc) {


    console.log(loc);
    locs.push({
        name: 'temp',
        lat: loc.lat,
        lng: loc.lng,
        createdAt: new Date().getDate(),
        id: utilService.makeId()




    })

    console.log('locs:', locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}