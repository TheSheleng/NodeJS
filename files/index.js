import fs from 'fs';
import readline from 'readline';

// Task 1
// Створюємо буфер з текстом
const buffer = Buffer.from('Hello, Node.js!');

// Виводимо вміст буфера у консоль
console.log(buffer.toString());

// Зберігаємо буфер у файл
fs.writeFileSync('task1.txt', buffer);

console.log('');

// Task 2
// Створюємо буфер з випадковими даними
const randomBuffer = Buffer.alloc(10);
for (let i = 0; i < randomBuffer.length; i++) {
    randomBuffer[i] = Math.floor(Math.random() * 256); // Випадкові байти
}

// Зберігаємо буфер у файл
fs.writeFileSync('task2.bin', randomBuffer);

// Зчитуємо буфер з файлу
const fileBuffer = fs.readFileSync('task2.bin');

// Виводимо вміст буфера у консоль
console.log(fileBuffer);

console.log('');

// Task 3
// Створюємо інтерфейс для зчитування з консолі
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Запитуємо рядок у користувача
rl.question('Введіть рядок: ', (input) => {
    // Перетворюємо рядок у буфер
    const buffer = Buffer.from(input);

    console.log('Буфер:', buffer);

    // Перетворюємо буфер назад у рядок
    const str = buffer.toString();
    console.log('Рядок з буфера:', str);

    rl.close();
});

console.log('');

// Task 4
// Створюємо два буфери
const buffer1 = Buffer.from('Hello, ');
const buffer2 = Buffer.from('Node.js!');

// Об'єднуємо буфери
const combinedBuffer = Buffer.concat([buffer1, buffer2]);

// Виводимо об'єднаний буфер у консоль
console.log(combinedBuffer.toString());

// Зберігаємо об'єднаний буфер у файл
fs.writeFileSync('task4.txt', combinedBuffer);

console.log('');