// const fs = require('fs');
// const path = require('path');

// function createFolders(...folderNames) {
//     if (folderNames.length < 1 || folderNames.length > 100) {
//         throw new Error('Folder names count must be between 1 and 100.');
//     }

//     folderNames.forEach(folderName => {
//         const folderPath = path.join(__dirname, folderName);
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath);
//             console.log(`${folderName} papkasi yaratildi .`);
//         } else {
//             console.log(`${folderName} papkasi allaqachon mavjud .`);
//         }
//     });
// }
// createFolders('telefon', 'mashina', 'Oziq-Ovqat');

// /////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const fs = require('fs');
// const path = require('path');

// const telefonFilePath = path.join(__dirname, 'telefon.json');

// function deletePhoneById(id) {
//     if (!fs.existsSync(telefonFilePath)) {
//         console.log('telefon.json file does not exist.');
//         return;
//     }

//     try {
//         const mavjudMalumotlar = JSON.parse(fs.readFileSync(telefonFilePath, 'utf-8'));
//         const telefonDelete = mavjudMalumotlar.find(telefon => telefon.id === id);

//         if (!telefonDelete) {
//             console.log(`ID si ${id}ga teng bo'lgan telefon topilmadi.`);
//             return;
//         }

//         const yangiMalumot = mavjudMalumotlar.filter(telefon => telefon.id !== id);
//         fs.writeFileSync(telefonFilePath, JSON.stringify(yangiMalumot, null, 2));
//         console.log(`ID si ${id}ga teng bo'lgan telefon o'chirildi .`);
//     } catch (error) {
//         console.error('Error telefon.json:', error.message);
//     }
// }
// deletePhoneById(1);
/////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const fs = require('fs');
// const path = require('path');

// const telefonFilePath = path.join(__dirname, 'telefon.json');

// function readPhoneData() {
//     if (!fs.existsSync(telefonFilePath)) {
//         console.log('telefon.json degan file mavjud emas.');
//         return [];
//     }

//     try {
//         const data = JSON.parse(fs.readFileSync(telefonFilePath, 'utf-8'));
//         console.log('telefon data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error  telefon.json:', error.message);
//         return [];
//     }
// }
// readPhoneData();

////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const fs = require('fs');
// const path = require('path');

// const PhoneFilePath = path.join(__dirname, 'telefon.json');

// function readStreamExample() {
//     if (!fs.existsSync(PhoneFilePath)) {
//         console.log('telefon.json file mavjud emas.');
//         return;
//     }

//     const readStream = fs.createReadStream(PhoneFilePath, 'utf-8');
//     readStream.on('data', chunk => {
//         console.log('bolakni oqish:', chunk);
//     });

//     readStream.on('tugadi', () => {
//         console.log('file ni oqish tugadi.');
//     });

//     readStream.on('error', error => {
//         console.error('file oqishda error:', error.message);
//     });
// }

// readStreamExample();
//////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const PhoneFilePath = path.join(__dirname, 'telefon.json');

function transform() {
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformed = chunk.toString().toUpperCase();
            callback(null, transformed);
        }
    });

    const readStream = fs.createReadStream(PhoneFilePath, 'utf-8');
    const writeStream = fs.createWriteStream('transform_telefon.json');

    readStream.pipe(transformStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Data transformed and written to transformed_telefon.json');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });
}
transform();

