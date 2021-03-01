var imageContainer = $("#image_div");
var input = $( "#datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
var getImages = $("#btn_get_images");

getImages.click(function (event) { //all the processes happen when the button is clicked
    event.preventDefault();          // only then we'll be able to store the values in the active state.
    //selected date is collected only when the input has values.
    selectedDate = input.val();
    if(selectedDate === ""){
      alert("Please fill the required date");
      return;
    }        
    var urlToHit = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&earth_date="+selectedDate;
    $.ajax({
      url:urlToHit,
      method:'GET',
      success: function(data) {
            var allPhotos = data.photos;
            // console.log(allPhotos);
            if(allPhotos.length === 0 ) {
              alert("No photos available for this date");
              return;
          }
          $("#image_div img").remove();
          for (let pickedPhoto of allPhotos){
            imageContainer.append('<img src="'+pickedPhoto.img_src+'"alt="'+pickedPhoto.id+'">');
          }
        }
    });
});
