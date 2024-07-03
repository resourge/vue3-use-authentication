/* eslint-disable @typescript-eslint/no-explicit-any */
import { Encrypt } from "../utils/Crypto";

type LocalStorageParams = {
    encrypted?: boolean,
    encryptedSecret?: string,
}

export const useLocalStorage = ({ encrypted, encryptedSecret }: LocalStorageParams) => {
    if (encrypted && !encryptedSecret) {
        throw new Error('You must provide an encrypted secret to use encrypted local storage')
    }

    const getValue = (key: string) => {
        const value = localStorage.getItem(key)
        if(!value) return
        if (encrypted && encryptedSecret && value) {
            return  Encrypt.decryptValue(value, encryptedSecret)
        }
        const local_value = localStorage.getItem(key) ?? ''
        return JSON.parse(local_value)
    }

    const setValue = (key: string, value: string) => {
        if(!value) return 
        if (encrypted && encryptedSecret && value) {
            const enc_value = Encrypt.encryptValue(value, encryptedSecret)
            localStorage.setItem(key, enc_value)
        }else {
            localStorage.setItem(key, value)
        }
    }

    const clearValue = (key: string) => {
        localStorage.removeItem(key)
    }

    return {
        getValue,
        setValue,
        clearValue
    }
}
