const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const img = document.querySelector('img');  
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time');
const songDuration = document.getElementById('duration');

const songs = [
    {
        name: 'Selfless',
        artist: 'The Strokes',
        fileName: 'song-1',
        img: 'jpeg'

    },
    {
        name: 'Leave It In My Dreams',
        artist: 'The Voidz',
        fileName: 'song-2',
        img: 'jpg'
    },
    {
        name: 'Threat of Joy',
        artist: 'The Strokes',
        fileName: 'song-3',
        img: 'png'
    }
];

let isPlayed = false;
let actualSong = 0;

function playSong() {
    isPlayed = true;
    playBtn.classList.replace('fa-play' , 'fa-pause');
    playBtn.setAttribute('title' , 'Pause');
    music.play();
}

function pauseSong() {
    isPlayed = false
    playBtn.classList.replace('fa-pause' , 'fa-play')
    playBtn.setAttribute('title' , 'play');
    music.pause();
}

playBtn.addEventListener('click', () => {(isPlayed ? pauseSong() : playSong())})

function loadSong(song) {
    title.textContent = song.name;
    artist.textContent = song.artist;
    music.src = `/music/${song.fileName}.mp3`;
    img.src = `/img/${song.fileName}.${song.img}`;
}

function prevSong() {
    actualSong--;
    if (actualSong < 0) {
        actualSong = songs.length - 1;
    }
    loadSong(songs[actualSong])
    playSong();
}

function nextSong() {
    actualSong++;
    if (actualSong > songs.length - 1) {
        actualSong = 0;
    }
    loadSong(songs[actualSong])
    playSong();
}

function updateTime(event){
    if (isPlayed) {
        const {duration, currentTime} = event.srcElement;
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            songDuration.textContent = `${durationMinutes}:${durationSeconds}`

        }
    
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }    
}

function setProgress(event) {
    const width = this.clientWidth;
    const click = event.offsetX;
    const {duration} = music;

    music.currentTime = (click / width) * duration;
}


loadSong(songs[actualSong]);


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateTime)
progressContainer.addEventListener('click', setProgress)
music.addEventListener('ended', nextSong)
