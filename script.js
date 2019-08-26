const comicImg = document.getElementById("comic-image");
const input = document.getElementById("comic-selector");
const submitBtn = document.getElementById("submit-btn");
const comicTitle = document.getElementById("comic-title");
const pubDate = document.getElementById("publish-date");
const errorMsg = document.getElementById("error-message");
const altTxt = document.getElementById("alt-text");

// comic buttons
const firstComicBtn = document.getElementById("first-comic-btn");
const backComicBtn = document.getElementById("back-comic-btn");
const randomBtn = document.getElementById("random-comic-btn");
const forwardComicBtn = document.getElementById("forward-comic-btn");
const currentComicBtn = document.getElementById("current-comic-btn");

// from api return handler
let maxIDNum = [];

function apiReturnHandler() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText);
    // set max comic id on first get request to api
    if (maxIDNum.length < 1) {
      maxIDNum.push(data.num);
    }
    console.log(data);
    displayComic(data);
  }
}

// Call the comic API

function getComic(comicURL) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  let apiURL = comicURL;

  try {
    checkInputValue(input.value);
  } catch (err) {
    errorMsg.innerText = `*${err.message}`;
  }

  if (input.value) {
    apiURL = `https://xkcd.com/${input.value}/info.0.json`;
    input.value = "";
  }
  let url = proxy + apiURL;

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = apiReturnHandler;
  xhr.open("GET", url, true);
  xhr.send();
}

// check input value
function checkInputValue(value) {
  // maxNum is value pushed to array on first get request
  if (value == "" || (value <= maxIDNum[0] && value > 0)) {
    errorMsg.innerText = "";
  } else if (value > maxIDNum[0]) {
    clearComic();
    throw {
      name: "numberOutOfRange",
      message: `${value} is outside of the comic ID range.`
    };
  } else if (value < 1) {
    clearComic();
    throw {
      name: "numberBelowOne",
      message: "Please enter a number greater than zero."
    };
  }
}

function displayComic(data) {
  let date = `${data.month}/${data.day}/${data.year}`;
  let currDate = new Date();

  input.placeholder = `enter comic# 1-${maxIDNum[0]}`;

  // Comic Image
  comicImg.alt = data.alt;
  comicImg.src = data.img;

  // Comic Title (check publish date v. current date)
  console.log(maxIDNum[0]);
  currDate.getMonth() + 1 == data.month &&
  currDate.getDate() == data.day &&
  currDate.getFullYear() == data.year
    ? (comicTitle.innerText = `Today's Comic #${data.num}: ${data.title}`)
    : data.num == maxIDNum[0]
    ? (comicTitle.innerText = `Latest Comic #${data.num}: ${data.title}`)
    : (comicTitle.innerText = `#${data.num}: ${data.title}`);

  // alt text
  altTxt.innerHTML = data.alt;

  // Comic Publish Date
  pubDate.innerHTML = `Published ${date}`;
}

function clearComic() {
  comicImg.src = "";
  comicImg.alt = "";
  comicTitle.innerText = "Please enter a valid comic id...";
  altTxt.innerText = "";
  pubDate.innerText = "";
}

//
getComic("https://xkcd.com/info.0.json");

// Fetch Comic on submit btn click
submitBtn.addEventListener("click", () => {
  getComic("https://xkcd.com/info.0.json");
});
// Fetch Comic on enter keydown
input.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    getComic("https://xkcd.com/info.0.json");
  }
});
