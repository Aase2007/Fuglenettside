import readXlsxFile from 'read-excel-file'

let nyheter = document.getElementById('nyheter')
let nyhet = document.createElement('p')
nyhet.append('hei')
nyheter.appendChild(nyhet)

readXlsxFile('/NNKF142-20241111komplett.xlsx').then((rows) => {
    console.log('hei')
    // `rows` is an array of rows
    // each row being an array of cells.
  })
