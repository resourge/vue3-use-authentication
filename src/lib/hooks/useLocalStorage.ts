/* eslint-disable @typescript-eslint/no-explicit-any */
export const useLocalStorage = () => {
    const getValue = (key: string) => {
        return localStorage.getItem(key)
    }

    const setValue = (key: string, value: any) => {
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
