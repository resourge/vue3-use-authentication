function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(buffer));
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function enhancedXorEncrypt(value: string, secret: string, passes = 2): string {
  let result = value;
  for (let pass = 0; pass < passes; pass++) {
    let tempResult = '';
    for (let i = 0; i < result.length; i++) {
      const charCode = result.charCodeAt(i);
      const keyCharCode = secret.charCodeAt((i + pass) % secret.length); // Slight variation
      const encryptedChar = String.fromCharCode((charCode ^ keyCharCode) << 1);
      tempResult += encryptedChar;
    }
    result = tempResult;
  }
  return result;
}

function enhancedXorDecrypt(value: string, secret: string, passes = 2): string {
  let result = value;
  for (let pass = passes - 1; pass >= 0; pass--) {
    let tempResult = '';
    for (let i = 0; i < result.length; i++) {
      const charCode = result.charCodeAt(i);
      const keyCharCode = secret.charCodeAt((i + pass) % secret.length); // Slight variation
      const decryptedChar = String.fromCharCode((charCode >> 1) ^ keyCharCode);
      tempResult += decryptedChar;
    }
    result = tempResult;
  }
  return result;
}

export class Encrypt {
  public static encryptValue(value: string, secret: string): string {
    const encrypted = enhancedXorEncrypt(value, secret);
    return arrayBufferToBase64(stringToArrayBuffer(encrypted));
  }

  public static decryptValue(value: string, secret: string): any | null {
    if (value) {
      const decrypted = enhancedXorDecrypt(arrayBufferToString(base64ToArrayBuffer(value)), secret);
      return JSON.parse(decrypted);
    }
    return null;
  }
}
