import { utilService } from './services/util.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;


function onInit() {

    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    // console.log(mapService.getclickLoc())
    locService.getLocs()
        .then(renderLocations)

}

function addEventListenrs() {
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6895, 139.6917);
    })
    document.querySelector('.go-btn').addEventListener('click', (ev) => {
        let elInput = document.querySelector('input[name=go-search]').value
        locService.getGeoAddress(elInput)
            .then(loc => {
                mapService.panTo(loc.lat, loc.lng);
            })
    })

    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(renderLocations)
            // .then(locs => {
            //     console.log('Locations:', locs)
            //     document.querySelector('.locs').innerText = JSON.stringify(locs)
            // })
    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                // document.querySelector('.user-pos').innerText =
                //     `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })



}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}


function renderLocations(locs) {
    console.log(locs);
    let strHtmls = locs.map(loc => {

        return `
    <div class="card-loc">
        <h3>${loc.name}</h3>
        <p>Created At:<br> ${loc.createdAt}</p> 
        <p>Updated At:<br> ${loc.updatedAt}</p>
        <p>Id: ${loc.id}</p>
        <div>
        <button id="${loc.id}" class="btn-go-to">Go</button>
        <button  id="${loc.id}" class="btn-delete">Delete</button>
        </div>
    </div>
        `
    }).join('');
    document.querySelector('.loc-table').innerHTML = strHtmls;
    let elBtns = document.querySelectorAll('.btn-go-to');

    elBtns.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            locService.getLocs()
                .then(locs => {
                    console.log(ev.target.id);
                    let currLoc = locs.filter(loc => {
                        return loc.id === ev.target.id
                    })
                    const { lat, lng } = currLoc[0]
                    console.log(lat, lng);
                    mapService.panTo(lat, lng);

                })
        });
    })
}