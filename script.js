const comicImg = document.getElementById("comic-image");
const input = document.getElementById("comic-selector");
const submitBtn = document.getElementById("submit-btn");
const comicTitle = document.getElementById("comic-title");

function apiReturnHandler() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);
    console.log(data);
    displayComic(data);
  }
}

// Call the comic API

function getComic() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  let apiURL = "https://xkcd.com/info.0.json";

  if (input.value) {
    apiURL = `https://xkcd.com/${input.value}/info.0.json`;
  }
  let url = proxy + apiURL;

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = apiReturnHandler;
  xhr.open("GET", url, true);
  xhr.send();
}

function displayComic(data) {
  let date = `${data.month}/${data.day}/${data.year}`
  let currDate = new Date();
  console.log(currDate);
  comicImg.alt = data.alt;
  comicImg.src = data.img;
  comicTitle.innerText = `#${data.num}: ${data.title}`
}

getComic();

submitBtn.addEventListener("click", () => {
  getComic();
});
input.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    getComic();
  }
});
