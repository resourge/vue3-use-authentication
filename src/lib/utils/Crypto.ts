import AES from 'crypto-js/aes'

export class Encrypt {
  public static encrypt (value: string, secret: string): string {
    return AES.encrypt(value, secret)
      .toString()
  }

  public static decrypt (value: string, secret: string): string {
    const bytes = AES.decrypt(value, secret)
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }
}
