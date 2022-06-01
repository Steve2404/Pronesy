let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;












/*      
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var positionInitial = new google.maps.LatLng(52.458320, 13.539420); // mes cordonnes
        var B = 0;
        
        
        function initialize() {
        
          directionsDisplay = new google.maps.DirectionsRenderer();
          
          var mapOptions = {
                zoom: 17,
                center: positionInitial,
                mapTypeId : google.maps.MapTypeId.HYBRID // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
            }
            
          map = new google.maps.Map(document.getElementById("map"), mapOptions);
          var log = document.getElementById("log");
          directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById("log"));
        
        }
        
        function calcRoute() {
          var selectedMode = document.getElementById("ItineraireRefuge").value;
          
          var request = {
              origin: positionInitial,
              destination: B,
              travelMode  : google.maps.DirectionsTravelMode.DRIVING // Mode de conduite
          };
          
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
        }
        
        function placeMarker(location) {
        
          var marker = new google.maps.Marker({
              position: location,
              map: map
            });
            
            SourieSurLeMarqueur(marker);
            
            positionInitial = marker;
            document.getElementById ('lat').setAttribute("value",location.lat().toString());
            document.getElementById ('lng').setAttribute("value",location.lng().toString());
            
         } 	
         
        function SourieSurLeMarqueur(marker) {  //AU CLICK GAUCHE SUR  LE MARQUEUR,
            google.maps.event.addListener(marker, 'click', function(event) {
                //CENTRER LA CARTE SUR LE MARQUEUR
                map.setCenter(this.getPosition());
                //AFICHER L'InfoWindow
                var Info = new google.maps.InfoWindow();
                Info.setContent( 'position : ' +event.latLng.toUrlValue(5));
                Info.open( this.getMap(), this);
            });
            //SUPRIME LE MARQUEUR AU CLICK DROIT
            google.maps.event.addListener(marker, 'rightclick', function() { this.setMap(null); } );    
          } 
          
        function SourieSurLaCarte() { //DOUBLE CLICK SUR LA CARTE,
            google.maps.event.addListener(map, 'dblclick', function(event) { 
                
                placeMarker(event.latLng); 	//PLACE LE MARQUEUR ET RECUPERE SEC CORDONNE
                
                
                
            //	
            } );
        
          }
               
        function main(){
            google.maps.event.addDomListener( window, 'load', initialize());
            placeMarker(positionInitial);
            SourieSurLaCarte();
        }
         
        main();
        
         */