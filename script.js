

function csvToList(string) {
  list = string.split("\n\r")
  console.log(list)
  return list
};

async function fetchCSV() {
  try {
      const response = await fetch('/fuglerliste.csv');
      const data = await response.text();
      const list = await data.split("\r\n")
      console.log(list)
      return list
  } catch (error) {
      console.error('Error fetching CSV:', error);
  }
};



fetchCSV().then((result) => {
  fuglerListe = result
  console.log(fuglerListe[5])
  for (let element = 0; element < fuglerListe.length; element++ ) {
    let listeelement = document.createElement('li')
    listeelement.append(fuglerListe[element])
    document.getElementById('liste').appendChild(listeelement)
  }
  //putte search inni her
}).catch(console.error);


function search() {
  console.log('yey', fuglerListe[1])
  var input, filter, li, a, txtValue;
  input = document.getElementById('søk');
  filter = input.value.toUpperCase();
  ul = document.getElementById("liste");
  li = ul.getElementsByTagName('li');

  console.log(input.value)
  for (let i = 0; i < fuglerListe.length; i++) {
    let a = fuglerListe[i];
    console.log(a, "a")
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none"; 
    }
  }
}