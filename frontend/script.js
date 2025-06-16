const API_URL = 'http://localhost:3000/'
let fuglerListe = []

async function getObservasjoner() {
  const res = await fetch(API_URL + "observations");
  const data = await res.json();
  let box
  for (let i=0; i< data.length; i++){
    let art = data[i].species
    let bruker = data[i].username
    let dato = data[i].date
    let beskrivelse = data[i].description
    box += `<div class="observasjonboks"> <p>${bruker}</p> <h2>${art}</h2> <p>${dato}</p> <p>${beskrivelse}</p> </div>`
  }
  document.getElementById('output').innerHTML = box
  
}
getObservasjoner()

async function getBirds() {
  const res = await fetch(API_URL + "birds")
  const data = await res.json();
  return data
}
getBirds().then((result) => {
  for(let i=0; i<result.length; i++){
    fuglerListe.push(result[i].nameNO)
  }
  fuglerListe.sort((a, b) => a.length - b.length);
  for (let element = 0; element < fuglerListe.length; element++ ) {
    let listeelement = document.createElement('div')
    listeelement.innerHTML = `<li onclick="clickItem(${element})" role="presentation" class="link"> ${fuglerListe[element]} </li>`
    document.getElementById('autofill').appendChild(listeelement)
  }
  console.log(fuglerListe)
});


function search() {
  var input, filter, li;
  input = document.getElementById('søk');
  filter = input.value.toUpperCase();
  ul = document.getElementById("autofill");
  li = ul.getElementsByTagName('li');

  for (let i = 0; i < fuglerListe.length; i++) {
    let a = fuglerListe[i];
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none"; 
    }
  }
}

function synligListe() {
  document.getElementById('autofill').style.display = "inline"
}

function clickItem(index) {
  document.getElementById('søk').value = fuglerListe[index]
  document.getElementById('autofill').style.display = 'none'
}


function sendinn() {

  let art = document.getElementById("søk").value
  let sted = document.getElementById('sted').value
  let dato = document.getElementById('dato').value
  let kommentar = document.getElementById('kommentar').value
  dato = dato.slice(0, 19).replace('T', ' ');
  let observasjonbundle = {
    "brukernavn": "admin",
    "art": art,
    "dato": dato,
    "sted": sted,
    "kommentar": kommentar
  }
  
  fetch(API_URL + "addobservation", {
    method: "POST",
    body: JSON.stringify(observasjonbundle),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function (response) {
    return response;
  })
  .then(function (data) {
    console.log(data);
    if (data) {
      var allInputs = document.querySelectorAll('input');
      allInputs.forEach(singleInput => singleInput.value = '');
      location.reload();
    } 
    else {
      document.getElementById('søkBoks').innerHTML += '<p>en feil har oppstått, prøv igjen</p>'
    }
  })
  .catch((error) => console.error("Error:", error));
  getObservasjoner()
};



// if (document.cookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ0ZXN0ZXIiLCJpYXQiOjE3NDcxMjE2NTgsImV4cCI6MTc0NzEyMTc3OH0.O0BU-pOJhbe7q1o3aYFO0ROPhwa7O6-lU5lFj8g_k2g"){
//     console.log('logget inn!')
// }

let x = document.cookie
console.log(x)