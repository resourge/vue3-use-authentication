/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { FormErrors, FormKey } from './types';
import {
	type OnErrors,
	type ValidationError,
	type ValidationErrors
} from './validators/setDefaultOnError';

function isNumeric(value: string | number) {
	if ( typeof value === 'number' ) {
		return true;
	}
	return /^[-]?([1-9]\d*|0)(\.\d+)?$/.test(value)
}

export const getKeyFromPaths = <T extends Record<string, any>>(paths: string[]): FormKey<T> => {
	return paths
	.map((key) => `${isNumeric(key) ? `[${key}]` : `${key}`}`)
	.join('.')
	.replace(/\.\[/g, '[') as FormKey<T>
}

export const formatErrors = <T extends Record<string, any>> (
	errors: ValidationErrors, 
	defaultErrors: FormErrors<T> = {}
) => {
	const _simpleErrors = errors
	.reduce<FormErrors<T>>((obj, value) => {
		const keys = Array.isArray(value.path) ? value.path : value.path.split('.')
		.map((key: string) => 
			key
			.split('[')
			.map((arrayKey) => arrayKey.replace(']', ''))
		)
		.flat();

		const path = getKeyFromPaths<T>(keys);

		if ( !obj[path] ) {
			obj[path] = []
		}

		// @ts-expect-error Can't be undefined as it will always be an array because of the previous array
		obj[path].push(...(value as ValidationError).error !== undefined ? [(value as ValidationError).error] : (value as ValidationWithErrors).errors);

		return obj
	}, {});

	return {
		...defaultErrors,
		..._simpleErrors
	}
}

export const createFormErrors = <T extends Record<string, any>>(onError: OnErrors) => 
	(errors: any, defaultErrors: FormErrors<T> = {}) => {
		return formatErrors<T>(onError(errors), defaultErrors)
	}
