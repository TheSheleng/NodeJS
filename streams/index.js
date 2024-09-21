import fs from 'fs';
import { Transform } from 'stream';

// Створюємо читабельний потік з текстового файлу
const readableStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

// Task 1
// Прочитуємо потік посимвольно і виводимо кожен символ з затримкою в 100 мс
readableStream.on('data', (chunk) => {
    let index = 0;

    function outputChar() {
        if (index < chunk.length) {
            console.log(chunk[index]);
            index++;
            setTimeout(outputChar, 100);
        }
    }

    outputChar();
});

// Task 2
// Створюємо трансформуючий потік
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

readableStream.pipe(upperCaseTransform).pipe(process.stdout);