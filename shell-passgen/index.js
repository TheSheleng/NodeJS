export default function GeneratePassword(length = 8, options = { letters: true, numbers: true, symbols: false }) {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = '';
    if (options.letters) characters += letters;
    if (options.numbers) characters += numbers;
    if (options.symbols) characters += symbols;

    if (!characters) {
        throw new Error('At least one type of characters (letters, numbers, symbols) must be included.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}