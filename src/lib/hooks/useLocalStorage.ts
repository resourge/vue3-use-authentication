/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorage } from "../utils/LocalStorage"

type LocalStorageParams = {
    encrypted?: boolean,
    encryptedSecret?: string,
}

export const useLocalStorage = ({ encrypted, encryptedSecret }: LocalStorageParams) => {
    const ls = new LocalStorage(encryptedSecret)
    if (encrypted && !encryptedSecret) {
        throw new Error('You must provide an encrypted secret to use encrypted local storage')
    }

    const getValue = (key: string) => {
        return ls.get(key)
    }

    const setValue = (key: string, value: any) => {
        return ls.set(key, value)
    }

    const clearValue = (key: string) => {
        ls.remove(key)
    }

    return {
        getValue,
        setValue,
        clearValue
    }
}
