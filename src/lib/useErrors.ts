/* eslint-disable @typescript-eslint/no-explicit-any */

import { UnwrapNestedRefs, computed } from 'vue';
import { FormKey } from './types';
import {
	State,
	type FormErrors,
	type FormOptions,
	type GetErrors,
	type GetErrorsOptions,
	type HasErrorOptions,
	type Touches
} from './types/types';

export type CacheType = string[] | FormErrors<any> | boolean


const checkIfCanCheckError = <T extends Record<string, any>>(
	key: string,
	touches: Touches<T>,
	onlyOnTouch?: boolean,
	onlyOnTouchKeys: Array<FormKey<T>> = []
) => {
	return !onlyOnTouch || 
		(
			(onlyOnTouch || onlyOnTouchKeys.length) && (
				// @ts-expect-error no types
				Boolean(touches[key]) || 
				// @ts-expect-error no types
				onlyOnTouchKeys.some((onlyOnTouchKey: any) => Boolean(touches[onlyOnTouchKey]))
			)
		)
}

export const useErrors = <T extends Record<string, any>>(
	state: UnwrapNestedRefs<State<T>>, 
	formOptions?: FormOptions<T>
) => {

	const cacheErrors = new Map<string, CacheType>();

	const clearCacheErrors = () => {
		cacheErrors.clear();
	};

	const hasError = (
		key: FormKey<T>, 
		options?: HasErrorOptions<T>
	): boolean => {
		const strict = options?.strict ?? true;
		const onlyOnTouch = options?.onlyOnTouch ?? formOptions?.onlyOnTouchDefault ?? true;
		const onlyOnTouchKeys = options?.onlyOnTouchKeys ?? [];
		
		const newErrors = computed(() => state.errors)

		const _errors: FormErrors<T> = newErrors.value ?? {};

		let hasError = false;

		// @ts-expect-error no types
		if ( checkIfCanCheckError(key, state.touches, onlyOnTouch, onlyOnTouchKeys) ) {
			hasError = Boolean(_errors[key]);
		}

		if ( hasError ) {
			return true;
		}
		else {
			if ( !strict ) {
				const regex = new RegExp(`^${key.replace('[', '\\[')
				.replace(']', '\\]')}`, 'g')

				return Object.keys(_errors)
				.some((errorKey) => {
					// @ts-expect-error no types
					if ( checkIfCanCheckError(errorKey, state.touches, onlyOnTouch) ) {
						return regex.test(errorKey)
					}
					return false;
				})
			}
		}
		return hasError;
	}

	function getErrors<Model extends Record<string, any> = T>(
		key: FormKey<Model>, 
		options: GetErrorsOptions<T> = {
			strict: true,
			onlyOnTouch: formOptions?.onlyOnTouchDefault ?? true,
			includeKeyInChildErrors: true,
			includeChildsIntoArray: false,
			onlyOnTouchKeys: []
		}
	): GetErrors<Model> {
		const _strict = options?.strict ?? true;
		const onlyOnTouch = options?.onlyOnTouch ?? formOptions?.onlyOnTouchDefault ?? true;
		const onlyOnTouchKeys = options?.onlyOnTouchKeys ?? [];
		const includeKeyInChildErrors = options?.includeKeyInChildErrors ?? true;
		const includeChildsIntoArray = options?.includeChildsIntoArray ?? false;

		const strict = includeChildsIntoArray ? false : _strict;

		const _errors: FormErrors<T> = computed(() => state.errors).value ?? {};

		const getErrors = (key: FormKey<Model>): GetErrors<Model> => {
			// @ts-expect-error no types
			if ( checkIfCanCheckError(key, state.touches, onlyOnTouch, onlyOnTouchKeys) ) {
				// @ts-expect-error no types
				return [..._errors[key] ?? []];
			}
			// @ts-expect-error no types
			return []
		}

		const newErrors = getErrors(key);

		if ( !strict ) {
			const regex = new RegExp(`^${key.replace('[', '\\[')
			.replace(']', '\\]')}`, 'g')

			Object.keys(_errors)
			.forEach((errorKey: string) => {
				if ( errorKey.includes(key) && errorKey !== key ) {
					let newErrorKey = includeKeyInChildErrors === true ? errorKey : (
						errorKey.replace(regex, '') || key
					)

					// Remove first char if is a "."
					if ( newErrorKey[0] === '.' ) {
						newErrorKey = newErrorKey.substring(1, newErrorKey.length)
					}

					const _newErrors = getErrors(errorKey as FormKey<Model>);

					if ( includeChildsIntoArray ) {
						newErrors.push(..._newErrors);
					}
					
					newErrors[newErrorKey as keyof GetErrors<Model>] = _newErrors as any;
				}
			});
		}

		return newErrors;
	}

	return {
		hasError,
		getErrors,
		clearCacheErrors
	}
}
