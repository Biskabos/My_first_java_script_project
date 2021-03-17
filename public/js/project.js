/* JS - Прогноз погоды от Biskabos-weather.ru. */

/* Мой список городов */
// Каменск-Уральский = id: 1504826
// Москва = id: 524894
// Киев = id: 703448
// Нью-Йорк = id: 5128638

/* Open Weather Map */
// Мой ID = 4b085ecf3e1036bccb0d57d80886d045
// Ссылка на API =http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4b085ecf3e1036bccb0d57d80886d045

const bg = document.querySelector('body');
const logo = document.querySelector('h1');

const ua = [
    'Будь ласка виберіть мову!',
    'Продовжити',
    'Будь ласка виберіть місто!',
    "Kamensk-Ural'skiy",
    'Moscow',
    'Kyiv',
    'New York',
    'Час',
    'Температура',
];
const ru = [
    'Пожалуйста выберите язык!',
    'Продолжить',
    'Пожалуйста выберите город!',
    'Каменск-Уральский',
    'Москва',
    'Киев',
    'Нью-Йорк',
    'Время',
    'Температура',
];
const en = [
    'Please select a language!',
    'Proceed',
    'Please select a city!',
    "Kamensk-Ural'skiy",
    'Moscow',
    'Kyiv',
    'New York',
    'Time',
    'Temperature',
];
const langList = {
    'ua': ua,
    'ru': ru,
    'en': en
}

const langEnter = document.querySelector('.lang-enter');
const btnGo = document.querySelector('.btn-go');
const languages = document.querySelector('.languages');
const lang = document.querySelectorAll('.lang');

const cityEnter = document.querySelector('.city-enter');
const btns = document.querySelector('.btns');
const btnCity = document.querySelectorAll('.btn-city');
const blocks = document.querySelector('.blocks');
const time = document.querySelectorAll('.time');
const temp = document.querySelectorAll('.temp-p');
const temps = document.querySelectorAll('.temp');
const weathers = document.querySelectorAll('.weather');

const api = 'https://api.openweathermap.org/data/2.5/forecast?';
let apiArr = [
    'id=1504826',
    'appid=4b085ecf3e1036bccb0d57d80886d045',
    'lang=ru'
];
let url = '';

lang.forEach(elem => {
    elem.onclick = () => {
        let langRes = elem.getAttribute('data');
        apiArr[2] = `lang=${langRes}`;

        langEnter.textContent = langList[langRes][0];
        btnGo.textContent = langList[langRes][1];
        cityEnter.textContent = langList[langRes][2];

        btnCity[0].textContent = langList[langRes][3];
        btnCity[1].textContent = langList[langRes][4];
        btnCity[2].textContent = langList[langRes][5];
        btnCity[3].textContent = langList[langRes][6];

        time[0].textContent = `${langList[langRes][7]} 12:00`;
        time[1].textContent = `${langList[langRes][7]} 15:00`;
        time[2].textContent = `${langList[langRes][7]} 18:00`;
        time[3].textContent = `${langList[langRes][7]} 21:00`;

        temp[0].textContent = langList[langRes][8];
        temp[1].textContent = langList[langRes][8];
        temp[2].textContent = langList[langRes][8];
        temp[3].textContent = langList[langRes][8];

        lang.forEach(flag => {
            flag.classList.remove('active');
        })
        elem.classList.add('active');
    }
});

document.querySelector('.btn-go').onclick = () => {
    languages.classList.add('hide');
    btns.classList.remove('hide');
}

document.querySelectorAll('.btn-city').forEach(btn => {
    btn.onclick = () => {
        apiArr[0] = btn.getAttribute('data');
        url = `${api}${apiArr.join('&')}`;
        RunWeather();
    }
});

function RunWeather() {
    fetch(url)
        .then(data => data.json())
        .then(res => {
            logo.textContent = `${res.city.name}`;
            cityEnter.classList.add('hide');
            bg.style.backgroundImage = `url(public/images/backgrounds/${res.city.id}.jpg)`;
            blocks.classList.remove('hide');

            temps.forEach((elem, index) => {
                elem.innerHTML = `${Math.round(res.list[index].main.temp - 273)}&deg;`;
                weathers[index].textContent = res.list[index].weather[0].description;
            });
        })
        .catch(error => console.log(error));
}
