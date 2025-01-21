
// import readXlsxFile from 'read-excel-file'

// let nyheter = document.getElementById('nyheter')
// let nyhet = document.createElement('p')
// nyhet.append('hei')
// nyheter.appendChild(nyhet)

// readXlsxFile('/NNKF142-20241111komplett.xlsx').then((rows) => {
//     console.log('hei')
//     // `rows` is an array of rows
//     // each row being an array of cells.
//   })

function csvToList(string) {
  list = string.split("\n\r")
  console.log(list)
  return list
};

// let fuglerliste = 'u\n\rfail'
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
  fuglerString = result
  console.log(fuglerString[5])
  for (let element = 0; element < fuglerString.length; element++ ) {
    let listeelement = document.createElement('li')
    listeelement.append(fuglerString[element])
    document.getElementById('liste').appendChild(listeelement)
  }
  //putte search inni her
}).catch(console.error);


function search() {
  console.log('yey', fuglerString[1])
  var input, filter, li, a, i, txtValue;
  input = document.getElementById('søk');
  filter = input.value.toUpperCase();

  console.log(input.value)
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}