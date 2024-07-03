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

    const getValue = async (key: string) => {
        const value = localStorage.getItem(key)
        if(!value) return
        if (encrypted && encryptedSecret && value) {
            const decryptedValue = await Encrypt.decryptValue(encryptedSecret, value)
            return JSON.parse(decryptedValue)
        }
        const local_value = localStorage.getItem(key) ?? ''
        return JSON.parse(local_value)
    }

    const setValue = async (key: string, value: string) => {
        if (encrypted && encryptedSecret && value) {
            const enc_value = await Encrypt.encryptValue(encryptedSecret, value)
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
