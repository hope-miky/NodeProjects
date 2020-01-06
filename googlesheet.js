const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./client_secret.json');

function printStudent(student) {
    console.log('Name: ' + student.studentname);
    console.log('Major: ' + student.major);
    console.log('Home: ' + student.homestate);
    console.log('--------------------------------------')
}


async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1h0t_SxjxZdWLtKfChwu9twoOozNyzB333yATyNHsfa8');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();

    const sheet = info.worksheets[0];
    //console.log('Tittle: ' + sheet.title, 'Rows: ' + sheet.rowCount);

    const rows = await promisify(sheet.getRows)({
        offset: 1,
        limit: 10,
        orderby: 'homestate',
        //query: 'homestate = AK',
    });

    //console.log(rows)

    rows.forEach(row => {
        row.homestate = ''
        printStudent(row);
    });

}


accessSpreadsheet();