'use strict'
import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo
}

var gMap;
var gCurrPos = { lat: '', lng: '' }

const myLatlng = { lat: 29.555, lng: 34.960 };
// navigator.geolocation.getCurrentPosition(
//     (position) => {
//         const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//         };
//         gCurrPos.lat = pos.lat
//         gCurrPos.lng = pos.lng
//     })


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