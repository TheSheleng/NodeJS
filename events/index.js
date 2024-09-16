import EventEmitter from 'events';

const emitter = new EventEmitter();

// Task 1
// Обробник 1
emitter.on('click', () => {
    console.log('Обробник 1: Кнопка натиснута!');
});

// Обробник 2
emitter.on('click', () => {
    console.log('Обробник 2: Кнопка натиснута знову!');
});

// Обробник 3
emitter.on('click', () => {
    console.log('Обробник 3: Це інший обробник для кліку.');
});

// Викликаємо подію 'click'
emitter.emit('click');

console.log('');

// Task 2
// Обробник 1
const errorHandler1 = () => {
    console.log('Обробник 1: Сталася помилка!');
};

// Обробник 2
const errorHandler2 = () => {
    console.log('Обробник 2: Це інший обробник помилок.');
};

// Підписуємося на подію 'error'
emitter.on('error', errorHandler1);
emitter.on('error', errorHandler2);

// Видаляємо один з обробників
emitter.removeListener('error', errorHandler1);

// Викликаємо подію 'error'
emitter.emit('error');

console.log('');

// Task 3
class Dice extends EventEmitter {
    roll() {
        const result = Math.floor(Math.random() * 6) + 1;
        this.emit('rolled', result);
    }
}

// Створюємо об'єкт класу Dice
const dice = new Dice();

// Підписуємось на подію 'rolled'
dice.on('rolled', (result) => {
    console.log(`Кость показала: ${result}`);
});

// Симуляція кидка кості
dice.roll();
dice.roll();

console.log('');

// Task 4
class Logger extends EventEmitter {
    info(message) {
        this.emit('info', message);
    }

    warn(message) {
        this.emit('warn', message);
    }

    error(message) {
        this.emit('error', message);
    }
}

// Створюємо об'єкт класу Logger
const logger = new Logger();

// Підписуємось на різні типи логів
logger.on('info', (message) => {
    console.log(`Інформаційний лог: ${message}`);
});

logger.on('warn', (message) => {
    console.log(`Попередження: ${message}`);
});

logger.on('error', (message) => {
    console.log(`Помилка: ${message}`);
});

// Викликаємо різні типи логів
logger.info('Це інформаційне повідомлення.');
logger.warn('Це попередження.');
logger.error('Це повідомлення про помилку.');

console.log('');