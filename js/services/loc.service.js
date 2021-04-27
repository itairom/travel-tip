export const locService = {
    getLocs
}
var locs = [
    { name: 'Tel-Aviv', lat: 32.047104, lng: 34.832384, createdAt: new Date().getDate(), updatedAt: 10, id:345},
    { name: 'Ramat Hasharon', lat: 32.047201, lng: 34.832581, createdAt: new Date(), updatedAt: 9,id:890}
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}