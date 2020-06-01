const print = console.log
const buttn = document.getElementById('sendReq');
const inputField = document.getElementById('location')
const weatherurl = "weather?location="
const country = document.getElementById('country');
const desc = document.getElementById('desc');
const temp = document.getElementById('temperature');
const feels = document.getElementById('percip');
const main = document.getElementsByClassName('res')[0];
const image = document.getElementById('pic');
const time = document.getElementById('time');
const ws = document.getElementById('ws');
const hum = document.getElementById('hum');
/* 
<img id = 'pic'>
                        <h4 id = 'country'> </h4>
                        <h4 id = 'time'> </h4>
                    </div>
                    <div class = 'second'>
                        <h4 id = 'desc'> </h4>
                    </div>
                    <div class = 'third'>
                        <h4 id = 'temperature'></h4>
                        <h4 id = 'feels'></h4>
*/

print('loaded')
print(buttn)
print(inputField)

buttn.addEventListener('click',function(){
    const http = new XMLHttpRequest();
    var newUrl =  weatherurl + encodeURIComponent(inputField.value); 
    print(newUrl)
    http.open("GET", newUrl);
    http.send();

    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        res = JSON.parse(http.responseText);
        print(res)
        if(res.weather_code == 113){
        main.style.background = 'skyblue';
        }else if(res.weather_code == 116){
        main.style.background = '#d9d7d8'
        }else if(res.weather_code == 119 || res.weather_code == 143){
        main.style.background = '#bcc4d1'; 
        }else if(res.weather_code == 302){
        main.style.background = '#626b7a'
        }else if(res.weather_code == 308 || res.weather_code == 200){
        main.style.background = '#343942';
        }else if(res.weather_code == 338){
        main.style.background = '#ffffff'
        }else if(res.weather_code == 353){
        main.style.background = '#9ac4f5'
        }else if(res.weather_code == 356){
        main.style.background = '#2b69b3'
        }else if(res.weather_code >= 389){
        main.style.background = '#3d403b'
        }else{
        main.style.background = '#f0ceec'
        }
        var timer = ""
        var i = 0
        for(i ; i<res.observation_time.length ; i++)
            {
            if(res.observation_time[i] == ' ')
                break;
            }
        for(var j = i+1 ; j<res.observation_time.length ; j++)
            {
            timer += res.observation_time[j];    
            }
        country.innerText = inputField.value;
        desc.innerText = res.weather_descriptions;
        temp.innerText = 'Temperature: ' + res.temperature;
        feels.innerText = 'Percipitation: ' + res.precip;
        time.innerText = timer;
        image.src = res.weather_icons[0];
        ws.innerText = 'Wind Speed: ' + res.wind_speed;
        hum.innerText = 'Humidity: ' + res.humidity;
        // desc : resp.body.current.weather_descriptions,
        // temperature: resp.body.current.temperature, 
        // feels_like: resp.body.current.feelslike, 
        // lati : lat, 
        // longi : long
        }
    }

});