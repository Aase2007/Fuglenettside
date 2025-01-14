
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
}
var fuglerliste = 'u\n\rfail'
// fetchCSV().then((result) => {
//   fuglerString = result
//   console.log(fuglerString)
// }).catch(console.error);
// .then(csvToList(fuglerString));

// .then(console.log(2));

fuglerliste = fetchCSV() 
.then(console.log(fuglerliste, "2"))