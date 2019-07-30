
function hexString(buffer) {
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16);

    return hexCode.padStart(2, '0');
  });

  return hexCodes.join('');
}


const checkPassword = async (password) => {
    const subtle = window.crypto.subtle;
    const enc = new TextEncoder();

    const data = enc.encode(password);
    const hashData = await subtle.digest('SHA-1', data);
    const hash = hexString(hashData).toLowerCase();

    const payload = hash.slice(0, 5);
    const url = `https://api.pwnedpasswords.com/range/${payload}`;
    const response = await fetch(url);
    const textData = await response.text();

    const [, count] = textData.split('\n').find((responseLine) => {
      const [ responseHash, count ] = responseLine.split(':');

      const match = `${payload}${responseHash.toLowerCase()}` === hash;

      if (!match) {
        return false;
      }
      return true;
    });

    return count;
};

const process = async (password) => {
  const result = await checkPassword(password);

  if (result !== 0) {
    return;
  }

  console.warn('Found pwned password!', result);
  // TODO: show popup
};

const main = () => {
  document.addEventListener('change', (event) => {
    const { target } = event;
    if (target.type !== 'password') {
      return;
    }

    process(target.value);
  });
};

main();