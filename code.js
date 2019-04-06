$('#search').on('click', function(){
  var city= $("#info").val();
  var id = "e562e9a40d2793a5497a96952ef7e91b";
  var url = "https://api.openweathermap.org/data/2.5/forecast/";
  var today = new Date();
  var time = today.getHours();
  var x = 0;
  while (time >= x) {
    x+=3;
  }
  y=24-x;
  y=y/3;
  y++;
  var count = 24+ y;

  $.ajax({
    url: url,
    timeout: 60000,
    dataType: "json",
    type: "GET",
    data: {
      q: city,
      appid: id,
      units: "metric",
      cnt: count
    },
    success: function(data) {
      for (var i=0;i<y;i++){
        delete data.list[i];
      }
      data.list.splice(0,y);
      var today = new Date();
      var tomorrow = new Date();
      var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var cityName = document.createElement("h2");
      cityName.innerHTML= data.city.name;
      $("#weather").prepend(cityName);

      var list = [];
      var pic = "";
      var desc = "";
      var iTemp = 0;

      var firstValue = data.list[0].dt_txt.split(" ")[0];
      $.each(data.list, function( index, value ) {
        //GET DAY OT THE WEEK
        tomorrow.setDate(today.getDate() + index);
        var date = week[tomorrow.getDay()];
        //END GET OF THE WEEK
        var dday = value.dt_txt.split(" ");
        if (firstValue !== dday[0] || index === 23)
        {
          list.push({"day": date + " " + firstValue, "temp": (iTemp/8).toFixed(2), "description": desc, "icon": pic});
          iTemp=0;
        }
        iTemp+=value.main.temp;
        if (dday[1] === "12:00:00")
        {
          pic = "https://openweathermap.org/img/w/" + value.weather[0].icon + ".png" ;
          desc = value.weather[0].description;
        }
        firstValue = data.list[index].dt_txt.split(" ")[0];
      });
//VUE
      Vue.component('weather-post', { props: ['item'],template: '<li class="weather-post"><b>{{item.day}}</b><br> <span> Temperature: {{item.temp}} &degC |  {{item.description}}</span> <img :src="item.icon"/> </li>'
    });

    new Vue({
      el: '#weather',
      data: { jlist : list }
    });
//END VIE





  },
  error: function(e) {
    console.log(e);
    switch (e.status) {
      case 404:  alert(e.responseJSON.message); break;
      default:
      alert("Something wrong")

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
