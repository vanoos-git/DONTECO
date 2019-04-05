
$('#search').on('click', function(){
  var city= $("#info").val();
  var id = "e562e9a40d2793a5497a96952ef7e91b";
  var url = "https://api.openweathermap.org/data/2.5/forecast";
  $.ajax({
    url: url,
    timeout: 60000,
    dataType: "json",
    type: "GET",
    data: {
      q: city,
      appid: id,
      units: "metric",
      cnt: "4"
    },
    success: function(data) {
      var today = new Date();
      var tomorrow = new Date();
      var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      $("#weather").html(" ");
      var cityName = document.createElement("h2");
      cityName.innerHTML= data.city.name;
      $("#weather").append(cityName);
      $.each(data.list, function(index, val) {
        tomorrow.setDate(today.getDate() + index);
        var date = week[tomorrow.getDay()];
        date += ' ' + tomorrow.getDate() + '/' + (tomorrow.getMonth() + 1) + '/' + tomorrow.getFullYear();

        if (index == 0) {
          var outBlock = document.createElement("div");
          var inBlock = document.createElement("div");
          $(outBlock).addClass("bg-primary text-light");
          $(inBlock).addClass("bg-dark bl").append("<h1>Today</h1>");
          $(inBlock).append(crtWeather(date, val));
          $(outBlock).append(inBlock);
          $("#weather").append(outBlock);
        }
        else {
          $("#weather").append(crtWeather(date, val));
        }
      });
    },
    error: function(e) {
      console.log(e);
      switch (e.status) {
        case 404:  alert(e.responseJSON.message); break;
        case 0: alert("Something wrong"); break;
        default:

      }
    }
  });
});

$('#info').keypress(function (e) {
  if (e.which == 13) {
    jQuery('#search').focus().click();
    return false;
  }
});

function crtWeather(date, val) {
  var pelem = document.createElement("p");
  $(pelem).append("<b>" + date + "</b><br>");
  $(pelem).append("<span> Temperature: " + val.main.temp + "&degC | " + val.weather[0].description + "</span>");
  $(pelem).append("<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>");
  return pelem;
}
