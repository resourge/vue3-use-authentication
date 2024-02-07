/* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowClone } from '@resourge/shallow-clone';
import { isObject } from '../FormUtils';


export type FormKey<T extends Record<string, any>> = keyof T;

type FormSetValue<T extends object> = (obj: T, val: any) => void;
const setValue = <T extends object>(field: string): FormSetValue<T> => {
	return new Function('obj', 'val', `obj${field ? `.${field}` : ''} = val`) as FormSetValue<T>;
};

type FormGetValue<T extends object> = (obj: T) => T[keyof T];
const getValue = <T extends object>(field: string): FormGetValue<T> => {
	return new Function('obj', `return obj${field ? `.${field}` : ''}`) as FormGetValue<T>;
};

export const createGetterSetter = <T extends object>(field: string) => {
	return {
		set: setValue<T>(field),
		get: getValue<T>(field)
	};
};

export type GetterSetter<T extends object> = Map<string, {
	get: FormGetValue<T>
	set: FormSetValue<T>
}>;

const maxLimitOfGetterSetter = 10000;

/**
 * To get and set form values
 * 
 * @returns - `set` and `get` methods
 */
export const useGetterSetter = <T extends Record<string, any>>() => {
	const getterSetter = new Map();

	const checkGetterSetter = (key: FormKey<T>) => {
		if (!getterSetter.has(key)) {
			if (getterSetter.size > maxLimitOfGetterSetter) {
				const firstElementKey = getterSetter.keys().next().value;
				if (firstElementKey) {
					getterSetter.delete(firstElementKey);
				}
			}
			// @ts-expect-error no error
			getterSetter.set(key, createGetterSetter(key));
		}
	};

	const set = (key: FormKey<T>, form: T, value: any) => {
		checkGetterSetter(key);
		if (isObject(value) || Array.isArray(value)) {
			getterSetter.get(key)!.set(form, shallowClone(value));
		}
		else {
			getterSetter.get(key)!.set(form, value);
		}
	};

	const get = (key: FormKey<T>, form: T) => {
		checkGetterSetter(key);
		return getterSetter.get(key)!.get(form);
	};

	return {
		set,
		get
	};
};
