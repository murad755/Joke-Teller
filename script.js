const audioElement = document.getElementById('audio');
const jokeTell = document.getElementById('joke-tell');
const programmingButton = document.getElementById('programming');
const punButton = document.getElementById('pun');
const darkButton = document.getElementById('dark');
const miscButton = document.getElementById('miscellaneous');


let currentApiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';

// Button toggle

const toggleButton = () => {
    jokeTell.disabled = !jokeTell.disabled;
};

// Pass joke to voice RSS API
const tellMe = (joke) => {
    console.log(joke);
    VoiceRSS.speech({
        key: MY_API_KEY,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from Joke API
const getJokes = async () => {
    let joke = '';
    try {
        const response = await fetch(currentApiUrl);
        const data = await response.json();
        //console.log(data);
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //console.log(joke);
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log('Wooops!', error);
    }
}

// Event listeners
jokeTell.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

// Object selection 
let elements = [
  {
    el: programmingButton,
    darkButton: false,
    punButton: false,
    programmingButton: true,
    miscButton: false,
    currentApiUrl: 'https://sv443.net/jokeapi/v2/joke/Programming',
  },
  {
    el: punButton,
    darkButton: false,
    punButton: true,
    programmingButton: false,
    miscButton: false,
    currentApiUrl: 'https://sv443.net/jokeapi/v2/joke/Pun',
  },
  {
    el: darkButton,
    darkButton: true,
    punButton: false,
    programmingButton: false,
    miscButton: false,
    currentApiUrl: 'https://sv443.net/jokeapi/v2/joke/Dark',
  },
  {
    el: miscButton,
    darkButton: false,
    punButton: false,
    programmingButton: false,
    miscButton: true,
    currentApiUrl: 'https://sv443.net/jokeapi/v2/joke/Miscellaneous'
  }
];

//category switch

for (let item of elements) {
  item.el.addEventListener('click', () => {
    punButton.disabled = item.punButton;
    darkButton.disabled = item.darkButton;
    programmingButton.disabled = item.programmingButton;
    miscButton.disabled = item.miscButton;
    currentApiUrl = item.currentApiUrl;
  });
}
