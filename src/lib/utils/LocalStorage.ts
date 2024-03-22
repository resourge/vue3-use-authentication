/* eslint-disable @typescript-eslint/no-explicit-any */
import ls from 'localstorage-slim';

export class LocalStorage {
  private isEncrypted = false;
  /**
   * 
   * Initialize local storage
   * @param secret 
   */

  private stringToNumber(s: string) {
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      total += s.charCodeAt(i);
    }
    return total;
  }


  constructor(secret?: string) {
    if (secret) {
      ls.config.encrypt = true;
      ls.config.secret = this.stringToNumber(secret);
      this.isEncrypted = true;
    }
  }
  /**
   * 
   * Set value to local storage
   * @param key 
   * @param value 
   * @returns 
   */
  public set(key: string, value: any) {
    return ls.set(key, value, { encrypt: this.isEncrypted })
  }

  /**
   * 
   * Get the value of a key from local storage
   * @param key 
   * @returns 
   */
  public get(key: string) {
    return ls.get(key, { decrypt: this.isEncrypted })
  }

  /**
   * 
   * Remove a value/key from local storage
   * @param key 
   */
  public remove(key: string): void {
    ls.remove(key)
  }
}
