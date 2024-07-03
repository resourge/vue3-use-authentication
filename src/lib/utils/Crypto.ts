import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

export class Encrypt {
  public static encrypt (value: string, secret: string): string {
    return AES.encrypt(value, secret)
      .toString()
  }

  public static decrypt (value: string, secret: string): string {
    const bytes = AES.decrypt(value, secret)
    const decryptedData = JSON.parse(bytes.toString(Utf8))
    return decryptedData
  }
}
