let placeSearch, autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['(cities)']}
  );
  autocomplete.addListener('place_changed', displayPlacePhoto)
}

function displayPlacePhoto() {
  const place = autocomplete.getPlace();
  console.log(place);
  console.log(place.photos.length);
  var photoUrl = place.photos[0].getUrl({'maxWidth': 1600});
  console.log(photoUrl);
  document.getElementById('place-photo').style.backgroundImage = 'url(' + photoUrl + ')';
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
