/* eslint-disable @typescript-eslint/no-explicit-any */
import ls from 'localstorage-slim';

export class LocalStorage {
  private isEncrypted = false;
  /**
   * 
   * Initialize local storage
   * @param secret 
   */
  constructor(secret?: string) {
    ls.config.encrypt = true;
    if (secret) {
      ls.config.secret = secret;
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
