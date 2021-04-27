'use strict'
import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo
}



var gMap;
let gClickLoc = {
    lat: 55,
    lng: 55
}

const myLatlng = { lat: 29.555, lng: 34.960 };


function initMap(lat = 29.555, lng = 34.960) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })

            new google.maps.Marker({
                position: gMap.center,
                map: gMap,

            });

            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng,
            });


            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                infoWindow.open(map);

                let loc = JSON.parse(infoWindow.content)
                    // setClickedLocations(loc.lat, loc.lng)
                console.log(locService.getLocs());

                locService.setLocs(loc)

            });


        })

}

function setClickedLocations(lat, lng) {
    gClickLoc.lat = lat
    gClickLoc.lng = lng
}

// function getclickLoc() {
//     return gClickLoc
// }





function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDXTPuZuBmNiNWO3LBY2ex2YwLXa6m1nSE'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}