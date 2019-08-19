function apiReturnHandler() {
  if (this.readyState == 4 && this.status == 200) {
      let comicData = JSON.parse(this.responseText);
      console.log(comicData);
  }
}

// Call the comic API

function getComic() {
  let url = "https://xkcd.com/info.0.json";

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = apiReturnHandler;
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhr.send();
}


getComic();