const comicImg = document.getElementById("comic-image");
const input = document.getElementById("comic-selector");
const submitBtn = document.getElementById("submit-btn");

function apiReturnHandler() {
  if (this.readyState == 4 && this.status == 200) {
    let comicData = JSON.parse(this.responseText);
    console.log(comicData);
    comicImg.alt = comicData.alt;
    comicImg.src = comicData.img;
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

getComic();

submitBtn.addEventListener("click", () => {
  getComic();
});
input.addEventListener("keydown", (e) => {
  if(e.keyCode === 13) {
    getComic();
  }
})