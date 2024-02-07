

## Usage useForm

Here is an example of how to use the useForm form state and validation in your Vue 3 application:

```jsx
// Import the package and create a form instance
import { useForm } from '../modules/useForm.ts'; // replace with correct path
import { object, string } from '@resourge/schema'; // validation schema documentation [Link](https://resourge.vercel.app/schema/intro)


// Define the shape of your form data
export class LoginUserFormModel {
  public username = '';
  public password = '';

  toModel() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}

// Define a schema for form validation
const schema = object<LoginUserFormModel>({
  username: string().notNullable().required('Username is required'),
  password: string().notNullable().required('Password is required')
});

// Create a form instance with default values and validation
export const useLoginForm = () => {
  return useForm<LoginUserFormModel>(new LoginUserFormModel(), {
    validate: (form) => {
      return schema.validate(form);
    },
    validateDefault: true
  });
};

// Use the form instance in your Vue component
const { form, handleSubmit, reset, getErrors } = useLoginForm();

// Define a submit handler for your form
const onSubmit = handleSubmit(async () => {
  // Your form submission logic here
});

// In your Vue template, bind form fields to form state and display validation errors
<template>
  <form @submit.prevent="onSubmit">
    <FormControl :label="T.pages.login.form.username" :errors="getErrors('username')">
      <Input v-model="form.username" type="text" />
    </FormControl>
    <FormControl :label="T.pages.login.form.password" :errors="getErrors('password')">
      <Input v-model="form.password" type="password" />
    </FormControl>
    <div class="form-actions">
      <Button :label="T.pages.login.actions.enter" type="submit" variant="primary" />
    </div>
  </form>
</template>
```

# FormState

The `FormState` type represents the state of a form in your application when using the `useForm` function. It provides various methods and properties to interact with and manage the form's state and data.

## Properties and Methods

### `changeValue(key, value)`

- **Description:** Updates the value of a specific field in the form.

### `errors`

- **Description:** An object containing validation errors for the form fields. The structure of this object matches the shape of the form data (T).

### `field`

- **Description:** Options and configurations for the form fields.

### `form`

- **Description:** Representation of the current state of the form data. This is a reactive object that reflects changes made to the form fields.

### `getErrors(key)`

- **Description:** Get the validation errors for a specific field in the form.

### `getValue(key)`

- **Description:** Get the current value of a specific field in the form.

### `handleSubmit(onSubmit)`

- **Description:** Handles form submission by invoking the provided callback function when the form is submitted. Returns a function that can be used as an event handler for form submission events.

### `hasError(key)`

- **Description:** Checks if a specific field in the form has validation errors.

### `isValid`

- **Description:** Indicates whether the form is currently in a valid state (i.e., no validation errors).

### `onChange(key)`

- **Description:** Attaches an event listener to a specific form field. When the field's value changes, the provided callback function is invoked with the new value.

### `reset(newForm)`

- **Description:** Resets the form to a specified state by replacing the current form data with the provided partial data object (`newForm`).

### `setError(error)`

- **Description:** Sets a validation error for the form or a specific field in the form. The `error` parameter can be a single error message or an object containing field-specific error messages.

### `watch(callback)`

- **Description:** Registers a callback function to watch for changes in the form's state. When any of the form fields change their values, the provided callback is invoked with an array of keys representing the changed fields.


## Support for complex forms like (wizards, multi-step, nested state)

```jsx
// Define the shape of your form data
export class UserAddressModel {
  public street = '';
  public city = '';
  public postalCode = '';
}

export class UserProfileModel {
  public firstName = '';
  public lastName = '';
  public address = new UserAddressModel();
}

// Define a schema for nested form validation
const addressSchema = object<UserAddressModel>({
  street: string().notNullable().required('Street is required'),
  city: string().notNullable().required('City is required'),
  postalCode: string().notNullable().required('Postal code is required')
});

const userSchema = object<UserProfileModel>({
  firstName: string().notNullable().required('First name is required'),
  lastName: string().notNullable().required('Last name is required'),
  address: addressSchema // Nested validation schema
});

// Create a form instance with default values and validation
export const useUserProfileForm = () => {
  return useForm<UserProfileModel>(new UserProfileModel(), {
    validate: (form) => {
      return userSchema.validate(form);
    },
    validateDefault: true
  });
};
```