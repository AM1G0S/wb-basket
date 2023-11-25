export function wordSelectionFrom(number, wordForms) {
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = lastTwoDigits % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return wordForms[2];
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return wordForms[1];
    }

    if (lastDigit === 1) {
        return wordForms[0];
    }

    return wordForms[2];
}
