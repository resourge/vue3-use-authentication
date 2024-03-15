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
        if (encrypted && encryptedSecret && value) {
            return Encrypt.decrypt(value, encryptedSecret)
        }
        return localStorage.getItem(key)
    }

    const setValue = (key: string, value: any) => {
        if (encrypted && encryptedSecret && value) {
            return localStorage.setItem(key, Encrypt.encrypt(value, encryptedSecret))
        }
        return localStorage.setItem(key, value)
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
