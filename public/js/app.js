const print = console.log
const buttn = document.getElementById('sendReq');
const inputField = document.getElementById('location')
const weatherurl = "weather?location="   
const main = document.getElementsByClassName('res')[0];
const children = Array.from(document.getElementsByClassName('childNode'));

children.forEach((x) => {
    x.addEventListener('click', ()=>{
        mainFxn(x.childNodes[0].textContent)
    })
})


const mainFxn = (provUrl) => {
    const http = new XMLHttpRequest();
    var loc 
    if(!provUrl)
        loc = inputField.value
    else   
        loc = provUrl

    var newUrl = weatherurl + encodeURIComponent(loc); 

    http.open("GET", newUrl);
    http.send();

    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        res = JSON.parse(http.responseText);
        // print(res)
        if(res.err_message)
            window.alert(res.err_message);
        else
            {
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
                // main.style.visibility = 'visible';
                const card = document.createElement('div');
                card.classList.add('card');
                const first = document.createElement('div');
                first.classList.add('first');
                const third = document.createElement('div');
                third.classList.add('third');
                card.appendChild(first);
                card.appendChild(third);
                const lf = document.createElement('div')
                lf.classList.add('lf');
                const rf = document.createElement('div')
                rf.classList.add('rf');
                const country = document.createElement('h4');
                country.id = 'country';
                const time = document.createElement('h4');
                time.id = 'time';
                const desc = document.createElement('h4');
                desc.id = 'desc';
                lf.appendChild(country);
                lf.appendChild(time);
                lf.appendChild(desc);
                const pic = document.createElement('img');
                pic.id = pic;
                rf.appendChild(pic);
        
                first.appendChild(lf);
                first.appendChild(rf);
        
                const ls = document.createElement('div');
                ls.classList.add('ls');
                const rs = document.createElement('div');
                rs.classList.add('rs');
                third.appendChild(ls);
                third.appendChild(rs);
                const gen1 = document.createElement('div');
                gen1.classList.add('generic');
                const gen2 = document.createElement('div');
                gen2.classList.add('generic');
                const gen3 = document.createElement('div');
                gen3.classList.add('generic');
                const gen4 = document.createElement('div');
                gen4.classList.add('generic');
                const thermo = document.createElement('i');
                thermo.classList.add('fas');
                thermo.classList.add('fa-thermometer-half')
                const temp = document.createElement('h4');
                temp.id = 'temperature';
                ls.appendChild(gen1);
                ls.appendChild(gen2);
                gen1.appendChild(thermo);
                gen1.appendChild(temp);
                const showers = document.createElement('i');
                showers.classList.add('fas');
                showers.classList.add('fa-cloud-showers-heavy');
                const percip = document.createElement('h4');
                percip.id = 'percip';
                gen2.appendChild(showers);
                gen2.appendChild(percip);
                rs.appendChild(gen3);
                rs.appendChild(gen4);
                const wind = document.createElement('i');
                wind.classList.add('fas');
                wind.classList.add('fa-wind');
                const ws = document.createElement('h4');
                ws.id = 'ws';
                gen3.appendChild(wind);
                gen3.appendChild(ws);
        
                const humi = document.createElement('i');
                humi.classList.add('fas');
                humi.classList.add('fa-tint');
                const hum = document.createElement('h4');
                hum.id = 'hum'
                gen4.appendChild(humi);
                gen4.appendChild(hum);
                
                
                country.innerText = loc;
                desc.innerText = res.weather_descriptions;
                temp.innerText = res.temperature;
                percip.innerText = res.precip;
                time.innerText = timer;
                pic.src = res.weather_icons[0];
                ws.innerText =  res.wind_speed;
                hum.innerText =  res.humidity;
        
                // print(card)
        
                if(res.weather_code == 113){
                    card.style.background = 'skyblue';
                    }else if(res.weather_code == 116){
                    card.style.background = '#d9d7d8'
                    }else if(res.weather_code == 119 || res.weather_code == 143){
                    card.style.background = '#bcc4d1'; 
                    }else if(res.weather_code == 302){
                    card.style.background = '#626b7a'
                    }else if(res.weather_code == 308 || res.weather_code == 200){
                    card.style.background = '#343942';
                    }else if(res.weather_code == 338){
                    card.style.background = '#ffffff'
                    }else if(res.weather_code == 353){
                    card.style.background = '#9ac4f5'
                    }else if(res.weather_code == 356){
                    card.style.background = '#2b69b3'
                    }else if(res.weather_code >= 389){
                    card.style.background = '#3d403b'
                    }else{
                    card.style.background = '#f0ceec'
                    }
                    
                card.style.transform = 'scaleX(0)';
                card.style.backgroundColor = 'rgba(73, 73, 139, 0.938)';
                main.appendChild(card);
                card.style.transform = 'scaleX(1)';
            }
        
        // desc : resp.body.current.weather_descriptions,
        // temperature: resp.body.current.temperature, 
        // feels_like: resp.body.current.feelslike, 
        // lati : lat, 
        // longi : long
        }
    }

}

buttn.addEventListener('click', () =>{
    mainFxn();    
});