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
        name: 'Are You Bored Yet?',
        artist: 'Wallows',
        fileName: './music/song-1.mp3',
        img: './img/song-1.jpg'
    },
    {
        name: 'Just The Way You Are',
        artist: 'Bruno Mars',
        fileName: './music/song-2.mp3',
        img: './img/song-2.jpg'
    },
    {
        name: 'Hold Me Down',
        artist: 'The Happy Fits',
        fileName: './music/song-3.mp3',
        img: './img/song-3.jpg'
    },
    {
        name: 'Cigarette Daydreams',
        artist: 'Cage The Elephant',
        fileName: './music/song-4.mp3',
        img: './img/song-4.jpg'
    },
    {
        name: 'Perfect',
        artist: 'Ed Sheeran',
        fileName: './music/song-5.mp3',
        img: './img/song-5.jpg'
    },
    {
        name: 'Sunflower',
        artist: 'Rex Orange County',
        fileName: './music/song-6.mp3',
        img: './img/song-6.jpg'
    },
    {
        name: 'Ordinary World',
        artist: 'Green Day',
        fileName: './music/song-7.mp3',
        img: './img/song-7.jpg'
    },
    {
        name: 'Cloud 9',
        artist: 'Beach Bunny',
        fileName: './music/song-8.mp3',
        img: './img/song-8.jpg'
    },
    {
        name: 'Bruja De Barracas',
        artist: 'Conociendo Rusia',
        fileName: './music/song-9.mp3',
        img: './img/song-9.jpg'
    },
    {
        name: 'Montaña Infinita',
        artist: 'Cabildo Y Juramento',
        fileName: './music/song-11.mp3',
        img: './img/song-11.jpg'
    },
    {
        name: 'Selfless',
        artist: 'The Strokes',
        fileName: './music/song-12.mp3',
        img: './img/song-12.jpeg'
    },
    {
        name: 'P.Y.T (Pretty Young Thing)',
        artist: 'Michael Jackson',
        fileName: './music/song-13.mp3',
        img: './img/song-13.jpg'
    },
    {
        name: 'Best Friend',
        artist: 'Rex Orange County',
        fileName: './music/song-14.mp3',
        img: './img/song-14.jpg'
    },
    {
        name: 'Amazing',
        artist: 'Rex Orange County',
        fileName: './music/song-15.mp3',
        img: './img/song-15.jpg'
    },
    {
        name: 'The Way You Make Me Feel',
        artist: 'Michael Jackson',
        fileName: './music/song-16.mp3',
        img: './img/song-16.jpg'
    },
    {
        name: 'Television / So Far So Good',
        artist: 'Rex Orange County',
        fileName: './music/song-17.mp3',
        img: './img/song-17.jpg'
    },
    {
        name: 'Happiness',
        artist: 'Rex Orange County',
        fileName: './music/song-18.mp3',
        img: './img/song-17.jpg'
    },
    {
        name: 'Noche Loca',
        artist: 'Marama',
        fileName: './music/song-20.mp3',
        img: './img/song-20.jpg'
    },
    {
        name: 'Shut Up And Dance',
        artist: 'Walk The Moon',
        fileName: './music/song-23.mp3',
        img: './img/song-23.jpg'
    },


];

let isPlayed = false;
let actualSong = 0;

function playSong() {
    isPlayed = true;
    playBtn.classList.replace('fa-heart' , 'fa-pause');
    playBtn.setAttribute('title' , 'Pause');
    music.play();
}

function pauseSong() {
    isPlayed = false
    playBtn.classList.replace('fa-pause' , 'fa-heart')
    playBtn.setAttribute('title' , 'play');
    music.pause();
}

playBtn.addEventListener('click', () => {(isPlayed ? pauseSong() : playSong())})

function loadSong(song) {
    title.textContent = song.name;
    artist.textContent = song.artist;
    music.src = song.fileName;
    img.src = song.img;
    img.alt = `${song.name} - ${song.artist}`;
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
