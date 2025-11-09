const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this._process(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this._process(encryptedMessage, key, 'decrypt');
  }

  _process(text, key, mode) {
    const result = [];
    let keyIndex = 0;
    const upperText = text.toUpperCase();
    const upperKey = key.toUpperCase();

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      
      if (char >= 'A' && char <= 'Z') {
        const textCode = char.charCodeAt(0) - 65;
        const keyCode = upperKey[keyIndex % upperKey.length].charCodeAt(0) - 65;
        
        let processedCode;
        if (mode === 'encrypt') {
          processedCode = (textCode + keyCode) % 26;
        } else {
          processedCode = (textCode - keyCode + 26) % 26;
        }
        
        result.push(String.fromCharCode(processedCode + 65));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return this.direct ? result.join('') : result.reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
