/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationError = {
	error: string
	path: string
}

export type ValidationErrors = Array<ValidationError>

export type OnErrors = (errors: any | any[]) => ValidationErrors

export let onErrorFn: OnErrors = (errors) => errors

export const getDefaultOnError = () => {
	return onErrorFn;
}

export const setDefaultOnError = (onError: OnErrors) => {
	onErrorFn = onError;
}
