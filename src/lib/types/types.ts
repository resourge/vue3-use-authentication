/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setDefaultOnError, type OnErrors, type ValidationErrors } from '../validators/setDefaultOnError';

import { type FormKey } from './FormKey';

export type ResetOptions =  {
	/**
	 * On reset `touches` will be cleared
	 * 
	 * @default true
	 */
	clearTouched?: boolean
}

export type Touches<T extends Record<string, any>> = {
	/**
	 * Paths for the keys touched
	 */
	[K in FormKey<T>]?: boolean
}

export type FormErrors<T extends Record<string, any>> = { 
	[K in FormKey<T>]?: string[]
}

export type HasErrorOptions<T extends Record<string, any>> = {
	/**
	 * When true only returns if the key was `touched` (@default false)
	 */
	onlyOnTouch?: boolean
	/**
	 * Array containing other keys to also validate on touch
	 */
	onlyOnTouchKeys?: Array<FormKey<T>>
	/**
	 * Includes object/array children
	 */
	strict?: boolean
}

export type GetErrorsOptions<T extends Record<string, any>> = {
	/**
	 * Includes the children errors on the array
	 */
	includeChildsIntoArray?: boolean
	/**
	 * Includes `key` in children paths
	 */
	includeKeyInChildErrors?: boolean
	/**
	 * When true only returns if the key was `touched` (@default false)
	 */
	onlyOnTouch?: boolean
	/**
	 * Array containing other keys to also validate on touch
	 */
	onlyOnTouchKeys?: Array<FormKey<T>>
	/**
	 * Includes children errors as object into array.
	 * 
	 * Note: If `includeChildsIntoArray` is true `strict`
	 * will by default be false
	 */
	strict?: boolean
}

export type GetErrors<T extends Record<string, any>> = string[] & FormErrors<T>

export type ResetMethod<T extends Record<string, any>> = (newFrom: Partial<T>, resetOptions?: ResetOptions | undefined) => Promise<void>

export type State<T extends Record<string, any>> = {
	errors: FormErrors<T>
	form: T
	touches: Touches<T>
}

export type FormOptions<T extends Record<string, any>> = {
	/**
	 * Triggers when form is changed
	 */
	onChange?: (state: State<T>) => Promise<void> | void
	/**
	 * Local method to treat errors.
	 * It's preferable to use {@link setDefaultOnError}
	 * 
	 * @expects - the method to return { [key]: [errors messages] }
	 * @example 
	 * ```Typescript
	 * const { ... } = useForm(
	 *	 {
	 * 		name: 'Rimuru'
	 *	 },
	 *   {
	 * 		onErrors: ({ form, isValid, errors }) => {
	 * 			/// This method changes the native `isValid`
	 * 			return true
	 * 		}
	 * 	 }
	 * )
	 * ```
	 */
	onErrors?: OnErrors
	/**
	 * When true only returns errors if the key was `touched` (@default false)
	 * * Note: Local onlyOnTouch takes priority over global onlyOnTouch
	 * @default true
	 */
	onlyOnTouchDefault?: boolean
	/**
	 * Triggers when form is submitted
	 */
	onSubmit?: (state: State<T>) => Promise<void> | void
	/**
	 * Method called every time a value is changed
	 * 
	 * @example 
	 * ```Typescript
	 * const { ... } = useForm(
	 *	 {
	 * 		name: 'Rimuru'
	 *	 },
	 *   {
	 * 		onTouch: (key) => { }
	 * 	 }
	 * )
	 * ```
	 */
	onTouch?: (key: FormKey<T>, value: unknown, previousValue: unknown) => void
	/**
	 * Method to validate form.
	 * Usually with some kind of validator.
	 * 
	 * @expects - to throw the errors, 
	 * 	so either `onError` or default method for `onError` {@link setDefaultOnError} can catch then 
	 * @param form - form state
	 * @example 
	 * ```Typescript
	 * const { ... } = useForm(
	 *	 {
	 * 		name: 'Rimuru'
	 *	 },
	 *   {
	 * 		validate: (form) => {
	 * 			throw new Error()
	 * 		}
	 * 	 }
	 * )
	 * ```
	 */
	validate?: (form: T, changedKeys: Array<FormKey<T>>) => void | Promise<void> | ValidationErrors | Promise<ValidationErrors>

	/**
	 * Validate form.
	 * When `true` every change batch will validate the form
	 * With `false` will only validate on method {@link FormActions#handleSubmit} 
	 * or if {@link FieldOptions#validate}/{@link ProduceNewStateOptions#validate} is set `true`.
	 * 
	 * * Note: Local {@link FieldOptions#validate} takes priority over global {@link FormOptions#validateDefault}
	 * @default true
	 */
	validateDefault?: boolean
}
