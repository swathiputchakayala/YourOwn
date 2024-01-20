const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const fileInput = document.getElementById('fileInput');
const currentSongElement = document.getElementById('currentSong');
const songListElement = document.getElementById('songList');



const loopSingleButton = document.getElementById('loopSingle');
const loopLinearButton = document.getElementById('loopLinear');
const loopRandomButton = document.getElementById('loopRandom');

let loopMode = 'none'; // Possible values: 'none', 'single', 'linear', 'random'
let currentSongIndex = 0;
let songList = [];

function toggleLoop(mode) {
  loopMode = mode;
  updateLoopButtons();
}

function updateLoopButtons() {
  loopSingleButton.classList.toggle('active', loopMode === 'single');
  loopLinearButton.classList.toggle('active', loopMode === 'linear');
  loopRandomButton.classList.toggle('active', loopMode === 'random');
}

loopSingleButton.addEventListener('click', function () {
  toggleLoop('single');
});

loopLinearButton.addEventListener('click', function () {
  toggleLoop('linear');
});

loopRandomButton.addEventListener('click', function () {
  toggleLoop('random');
});

audio.addEventListener('ended', function () {
  switch (loopMode) {
    case 'single':
      // Repeat the same song
      audio.play();
      break;
    case 'linear':
      // Play the next song in a linear order
      currentSongIndex = (currentSongIndex + 1) % songList.length;
      const linearObjectURL = URL.createObjectURL(songList[currentSongIndex]);
      audio.src = linearObjectURL;
      audio.play();
      updateSongInfo();
      break;
    case 'random':
      // Play a random song
      const randomIndex = Math.floor(Math.random() * songList.length);
      const randomObjectURL = URL.createObjectURL(songList[randomIndex]);
      audio.src = randomObjectURL;
      audio.play();
      updateSongInfo();
      break;
    default:
      // No loop, play the next song in a linear order
      currentSongIndex = (currentSongIndex + 1) % songList.length;
      const defaultObjectURL = URL.createObjectURL(songList[currentSongIndex]);
      audio.src = defaultObjectURL;
      audio.play();
      updateSongInfo();
      break;
  }
});




function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseButton.textContent = 'Play';
  }
}

function updateSongInfo() {
  currentSongElement.textContent = songList[currentSongIndex]?.name || 'No song selected';
}

fileInput.addEventListener('change', function () {
  songList = Array.from(this.files);
  currentSongIndex = 0;

  if (songList.length > 0) {
    const objectURL = URL.createObjectURL(songList[currentSongIndex]);
    audio.src = objectURL;
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.src = '';
    currentSongElement.textContent = 'No song selected';
    playPauseButton.textContent = 'Play';
  }

  // Update the song list display
  songListElement.innerHTML = '';
  songList.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.name}`;
    songListElement.appendChild(listItem);
  });

  
  audio.addEventListener('ended', function () {
    // Play the next song when the current one ends
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    const objectURL = URL.createObjectURL(songList[currentSongIndex]);
    audio.src = objectURL;
    audio.play();
    updateSongInfo();
  });
  const songListContainer = document.querySelector('.song-list-container');
  
  // Function to update the song list in the scroll box
  function updateSongList() {
    const songListElement = document.getElementById('songList');
    songListElement.innerHTML = ''; // Clear the existing list
  
    for (let i = 0; i < songList.length; i++) {
      const listItem = document.createElement('li');
      listItem.textContent = `Song ${i + 1}`; // Update this to show the actual song details
      songListElement.appendChild(listItem);
    }
  }
  updateSongInfo();
});
// ... (previous code)

// Function to handle song button click
function playSelectedSong(index) {
  if (index >= 0 && index < songList.length) {
    audio.src = URL.createObjectURL(songList[index]);
    audio.play();
    updateCurrentSongInfo(index);
  }
}

// Update the song list in the scroll box with clickable buttons
function updateSongList() {
  const songListElement = document.getElementById('songList');
  songListElement.innerHTML = ''; // Clear the existing list

  for (let i = 0; i < songList.length; i++) {
    const listItem = document.createElement('li');
    const songButton = document.createElement('button');
    songButton.textContent = `Song ${i + 1}`; // Update this to show the actual song details
    songButton.addEventListener('click', () => playSelectedSong(i));
    listItem.appendChild(songButton);
    songListElement.appendChild(listItem);
  }
}

// ... (rest of the code)

// Inside the fileInput change event listener, after updating the songList array

// Update the song list in the scroll box
updateSongList();




