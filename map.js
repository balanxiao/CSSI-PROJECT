var mapDiv = document.getElementById("map");

//default sjsu
var myLatLng = {lat:37.3387, lng:-121.8853}

//default map
var map = new google.maps.Map(mapDiv, {
    center: myLatLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
});

var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
});

//get user location
navigator.geolocation.getCurrentPosition(
   function (position) {
     console.log(position.coords.latitude)
     console.log(position.coords.longitude)
     // put current pos
      myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude}
     console.log(myLatLng)

    // make new map
    map = new google.maps.Map(mapDiv, {
      center: myLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
   },
   function errorCallback(error) {
      console.log(error)
   }
);

//input box
var desti = document.querySelector("#destination")

var defaultBounds = {
    north: myLatLng.lat + 0.1,
    south: myLatLng.lat - 0.1,
    east: myLatLng.lng + 0.1,
    west: myLatLng.lng - 0.1,
};
var options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

var time = document.getElementById("travel-data");
var point;
//autocomplete object
new google.maps.places.Autocomplete(desti, options)

// route button
var routeB = document.querySelector("#routeButton");

// function to run after button click
routeB.addEventListener("click", (e) => {
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(
      {
            // change with current location
            origin: myLatLng,
            // change with destination
            destination: desti.value,
            travelMode: "TRANSIT",
      },
      (response, status) => {
          if (status === "OK") {

            // create directions route
            new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                directions: response,
                map: map,
              });

            //get route duration/distance
            point = response.routes[0].legs[0];
            time.innerHTML = 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')';
        }
    }
)
});




