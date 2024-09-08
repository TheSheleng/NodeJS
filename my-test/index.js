import GeneratePassword from 'shell-passgen';

console.log(GeneratePassword(10, { letters: true, numbers: true, symbols: true }));
console.log(GeneratePassword(8, { letters: true, numbers: false, symbols: false }));