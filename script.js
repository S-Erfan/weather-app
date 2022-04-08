// http://openweathermap.org/img/wn/10d@2x.png
// api.openweathermap.org/data/2.5/weather?q=tehran&appid=6b6d6af847376637b811322e5e4655e1&units=metric
// 6b6d6af847376637b811322e5e4655e1


const trand = document.querySelectorAll("span");
const city = document.querySelector("#search");
const ajax = document.querySelector(".ajax");
const err = document.querySelector(".err");


const apiKey = '6b6d6af847376637b811322e5e4655e1';


window.addEventListener("keydown", (e)=> {  
    // e.preventDefault();  
    if(e.key === "Enter") {
        const cityTar = city.value;
        if(cityTar === "") {
            alert("plaes enter a city");
        }else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityTar}&appid=${apiKey}&units=metric`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                    setTrand(cityTar);  
                    const {name , main , weather , sys} = data;
                    const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                    const date = new Date();
                    const card = document.createElement("div");
                    card.classList.add("card");
                    const markup = `
                        <h1>${name} ${sys.country}</h1>
                        <h3>${Math.round(main.temp)}<sup>c</sup></h3>
                        <p>${weekDay} <br> ${date.getHours()}:${date.getMinutes()}</p>
                        <div class="img">
                            <img src="${icon}" alt="logo">
                            ${weather[0]["description"]}
                        </div>
                        <i class="far fa-heart"></i>`;
                    card.innerHTML = markup;
                    ajax.appendChild(card);
                    err.innerText = "";
                })
                .catch(()=>{
                    err.innerText = "Search for a valid city";
                })
        }
        city.value = "";
    }
});



const date = new Date().getDay();
const weekDay = new Date().toLocaleString('default',{weekday:'long'});



function setTrand(item) {
    trand[2].innerText = trand[1].innerText;
    trand[1].innerText = trand[0].innerText;
    trand[0].innerText = item;
}

const fav = document.querySelector(".ajax");


fav.addEventListener("click",(event)=>{
    if(event.target.tagName === "I"){
        const addFav = event.target.classList;
        if(addFav.value === "far fa-heart"){
            event.target.className = "fas fa-heart";
            event.target.parentNode.classList.toggle("liked");
        } else {
            event.target.className = "far fa-heart";
            event.target.parentNode.classList.toggle("liked");
        }
    }    
});

const favorite = document.querySelectorAll("ul li a");
favorite.forEach((item)=> {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        
        if(e.target.innerText === "Favorite"){
            const card = document.querySelectorAll(".card");
            e.target.classList.add("active");
            favorite[0].classList.remove("active");
            card.forEach((item)=> {
                console.log(item);
                if(item.classList.value === "card liked"){
                    item.style.display = null;
                }else {
                    item.style.display = "none";
                }
            })
        }else {
            const card = document.querySelectorAll(".card");
            card.forEach((item) => {
                item.style.display = null;
            })
            e.target.classList.add("active");
            favorite[1].classList.remove("active");
        }
    })
});

trand.forEach((item)=> {
    item.addEventListener("click",(e)=>{
        const cityName = e.target.innerText;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            fetch(url)
                .then(response => response.json())
                .then(data => {  
                    const {name , main , weather , sys} = data;
                    const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                    const date = new Date();
                    const card = document.createElement("div");
                    card.classList.add("card");
                    const markup = `
                        <h1>${name} ${sys.country}</h1>
                        <h3>${Math.round(main.temp)}<sup>c</sup></h3>
                        <p>${weekDay} <br> ${date.getHours()}:${date.getMinutes()}</p>
                        <div class="img">
                            <img src="${icon}" alt="logo">
                            ${weather[0]["description"]}
                        </div>
                        <i class="far fa-heart"></i>`;
                    card.innerHTML = markup;
                    ajax.appendChild(card);
                    err.innerText = "";
                })
            .catch(()=>{
                err.innerText = "Search for a valid city";
            })
    })
});




const lightTheme = "style-light.css";
const darkTheme = "style.css";
const theme = document.getElementById("theme");
const mood = document.querySelector("#set-theme");
theme.addEventListener("click", (event)=> {
    if(mood.getAttribute("href") == darkTheme){
        event.target.className = "fas fa-moon";
        mood.href = "style-light.css";
    }else{
        event.target.className = "fas fa-sun";
        mood.href = "style.css";
    }
});