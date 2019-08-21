const comicImg = document.getElementById("comic-image");
const input = document.getElementById("comic-selector");
const submitBtn = document.getElementById("submit-btn");
const comicTitle = document.getElementById("comic-title");
const pubDate = document.getElementById("publish-date");
const errorMsg = document.getElementById("error-message");

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

  try {
    checkInputValue(input.value);
  } catch (err) {
    errorMsg.innerText = `*${err.message}`;
  }

  if (input.value) {
    apiURL = `https://xkcd.com/${input.value}/info.0.json`;
  }
  let url = proxy + apiURL;

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = apiReturnHandler;
  xhr.open("GET", url, true);
  xhr.send();
}

// check input value
function checkInputValue(value) {
  if (value == "" || value <= 2191 && value > 0) {
    errorMsg.innerText = "";
  } else if (value > 2191) {
    throw {
      name: "numberOutOfRange",
      message: `${value} is outside of the comic ID range.`
    };
  } else if (value <= 0) {
    throw {
      name: "numberBelowOne",
      message: "Please enter a number greater than zero."
    };
  }
}

function displayComic(data) {
  let date = `${data.month}/${data.day}/${data.year}`;
  let currDate = new Date();

  input.placeholder = `enter comic# 1-${data.num}`;

  // Comic Image
  comicImg.alt = data.alt;
  comicImg.src = data.img;

  // Comic Title
  currDate.getMonth() + 1 == data.month &&
  currDate.getDate() == data.day &&
  currDate.getFullYear() == data.year
    ? (comicTitle.innerText = `Today's Comic #${data.num}: ${data.title}`)
    : (comicTitle.innerText = `#${data.num}: ${data.title}`);

  // Comic Publish Date
  pubDate.innerHTML = `Published ${date}`;
}

getComic();

// Fetch Comic on submit btn click
submitBtn.addEventListener("click", () => {
  getComic();
});
// Fetch Comic on enter keydown
input.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    getComic();
  }
});
