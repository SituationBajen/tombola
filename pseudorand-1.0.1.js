/**
 * This function converts a binary buffer to hexadecimal string.
 * Arguments:
 * 	 buffer - An ArrayBuffer
 * Returns:
 * 	 String with hexadecimal value.
 */
function buf2hex(buffer) {
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * This is the pseudo random function that generates the code that we will sort the season tickets by.
 * The choice of algorithm is described in more detail in README.md.
 * Arguments:
 *   keyStr - The code string.
 *   iteration - Integer. First season ticket is 0, second is 1, etc...
 * Returns:
 *   String with hexadecimal value.
 */
async function pseudoRand(keyStr, iteration) {

	// Makes a binary buffer by the concatenated values of keyStr and iteration.
	const keyBuf = new TextEncoder().encode(keyStr + "" + iteration);

	// Returns CryptoKey object that can be used to derive a new key.
	const key = await window.crypto.subtle.importKey(
		'raw',
		keyBuf,
		{ name: 'PBKDF2' },
		false,
		['deriveKey']
	);

	// Derives a new key.
	// When making keys for cryptography,
	// the iteration number is usually much higher since you want brute force attacks to be slow.
	// Here we don't want it that slow, so we set iteration to 12 (tolfte spelaren).
	// The salt is empty. We don't really need a salt for the purpose of this tombola, but it is a required property.
	const derivedKey = await window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			hash: "SHA-256",
			salt: new TextEncoder().encode(""),
			iterations: 12
		},
		key,
		{ "name": 'AES-CBC', "length": 256 },
		true,
		["encrypt", "decrypt"]
	);

	// Export the new derived key into binary buffer.
	const rawDerivedKey = await crypto.subtle.exportKey("raw", derivedKey);

	// Convert the derived key buffer into hexadecimal and return that as the pseudo random value.
	return buf2hex(rawDerivedKey);
}

export default pseudoRand;
