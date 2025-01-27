

async function fetchCSV() {
  try {
      const response = await fetch('/fuglerliste.csv');
      const data = await response.text();
      const list = await data.split("\r\n")
      return list
  } catch (error) {
      console.error('Error fetching CSV:', error);
  }
};

fetchCSV().then((result) => {
  fuglerListe = result
  fuglerListe.sort((a, b) => a.length - b.length);
  for (let element = 0; element < fuglerListe.length; element++ ) {
    let listeelement = document.createElement('div')
    listeelement.innerHTML = `<li onclick="clickItem(${element})" role="presentation" class="link"> ${fuglerListe[element]} </li>`
    document.getElementById('liste').appendChild(listeelement)
  }
}).catch(console.error);


function search() {
  var input, filter, li;
  input = document.getElementById('søk');
  filter = input.value.toUpperCase();
  ul = document.getElementById("liste");
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
  document.getElementById('liste').style.display = "inline"
}

function clickItem(index) {
  document.getElementById('søk').value = fuglerListe[index]
  search()
}

function bekreft() {
  document.getElementById('liste').style.display = 'none'
}