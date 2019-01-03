

var map;
var infoWindow = new google.maps.InfoWindow({});

var markers = []; // Create a marker array to hold your markers
var beaches = [
    // ["Fortaleza SA 1","-3.74283","-38.51081"],
    // ["Anápolis SA 1","-16.32733","-48.95486"],
    // ["Teresina SA 1","-5.08367","-42.8048"],
    // ["Teresina SA 2","-5.07535","-42.79104"],
    // ["Teresina SA 3","-5.055","-42.83692"]
    // ["Barueri SA","-23.5113691","-46.872942"],
    // ["São Paulo SA","-23.5505","-46.6333"],
    // ["Ribeirão Preto SA","-21.1704","-47.8103"],
    // ["Curitiba SA","-25.4809","-49.3044"],
    // ["Sorocaba SA","-23.4557","-47.4883"],
    // ["Jundiaí SA","-23.1857","-46.8978"]
        
];


google.maps.event.addDomListener(window, 'load', initialize);





function setMarkers(locations) {


    for (var i = 0; i < locations.length; i++) {
        var beach = locations[i];
        var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: beach[0]
        });
        
        // Push marker to markers array
        markers.push(marker);
        
        
        
        google.maps.event.addListener(marker, 'click', function() {
           infoWindow.setContent(this.title);
           infoWindow.open(map, this);
        });        
        
        
    }
}

function reloadMarkers() {

    // Loop through markers and set map to null for each
    for (var i=0; i<markers.length; i++) {
     
        markers[i].setMap(null);
    }
    
    // Reset the markers array
    markers = [];
    
    // Call set markers to re-add markers
    setMarkers(beaches);
}

function validate(elementIdsArray) {
    var exitValue = true;
    for (var i = 0;i < elementIdsArray.length;i++) {
        if (document.getElementById(elementIdsArray[i]).value.length == 0) {
            document.getElementById(elementIdsArray[i]).parentElement.classList.add("has-error");

            console.log(document.getElementById(elementIdsArray[i]));
            console.log(document.getElementById(elementIdsArray[i]).nextSibling);

            document.getElementById(elementIdsArray[i]).parentElement.getElementsByClassName('help-block')[0].style.display = "inline";
            exitValue = false;
        }
        else {
            document.getElementById(elementIdsArray[i]).parentElement.getElementsByClassName('help-block')[0].style.display = "none";
            document.getElementById(elementIdsArray[i]).parentElement.classList.remove("has-error");
        }   

    }

    return exitValue;
       
  
}

function addCoord() {


    if (!validate(['rs','lat','lng','trab','lat2','lng2'])) {
        return false;
    }

    //erase previous markers from array
    beaches = [];
    
    for (var i=0; i<markers.length; i++) {
        markers[i].setMap(null);
    }

    markers = [];
    var coord = {};
    var coord2 = {};

    coord.name = document.getElementById('rs').value;
    coord.lat = document.getElementById('lat').value;
    coord.lon = document.getElementById('lng').value;

    coord2.name = document.getElementById('trab').value;
    coord2.lat = document.getElementById('lat2').value;
    coord2.lon = document.getElementById('lng2').value;

    beaches.push([coord.name,coord.lat,coord.lon]);
    beaches.push([coord2.name,coord2.lat,coord2.lon]);
    console.log(beaches);

    setMarkers(beaches);

    // for (var i=0; i<markers.length; i++) {
    //     bounds.extend(markers[i].position);
    //     markers[i].setMap(map);
    // }  

    // var bounds = new google.maps.LatLngBounds();
    // map.fitBounds(bounds);

    initialize();

}

function initialize() {

    var userCenter = new google.maps.LatLng(0, 0);

    var userCenterMarker = new google.maps.Marker({
        position: userCenter
    });

    var mapOptions = {
        center: userCenter,
        zoom: 12,
        center: new google.maps.LatLng(10,12),
        mapTypeId: google.maps.MapTypeId.TERRAIN //ROADMAP SATELLITE HYBRID TERRAIN
    }
    
    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);


    var bounds = new google.maps.LatLngBounds();

    setMarkers(beaches);
    
    for (var i=0; i<markers.length; i++) {
        bounds.extend(markers[i].position);
        markers[i].setMap(map);
    }  
    
    map.fitBounds(bounds);
    
    // Bind event listener on button to reload markers
    // document.getElementById('reloadMarkers').addEventListener('click', reloadMarkers);
    

    // Bind event listener on button to add markers


    document.getElementById('addMarker').addEventListener('click', addCoord);
    
    

}



