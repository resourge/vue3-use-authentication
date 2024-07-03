# Vue 3 Authentication

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description

Vue 3 Authentication is a Vue 3 composition API library for managing user authentication and permissions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To install use npm:

```bash
npm install @resourge/vue3-use-authentication
# or
yarn add @resourge/vue3-use-authentication
```

## Usage

### Configuration

In your main `App.vue` file, configure the `AuthenticationProvider` component. This component is responsible for managing authentication state throughout your application.

```vue
<script lang="ts" setup>
import { AuthenticationProvider } from '@resourge/vue3-use-authentication';
</script>

<template>
  <AuthenticationProvider :localStorageSessionKey="SESSION_STORAGE_KEY" encrypted :encryptedSecret="SOME_RANDOM_STRING">
    <RouterView />
  </AuthenticationProvider>
</template>
```

Replace `SESSION_STORAGE_KEY` and `SOME_RANDOM_STRING` with your actual session storage key and encrypted secret respectively.

### Profile and Permissions

Define your user Profile and Permissions in your application. You can use TypeScript interfaces or classes to define your user profile and permissions.:

`Profile.ts`

```typescript
export class Profile {
  id: string;
  name: string;
  email: string;
  
  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
```


Wrapper for the `useAuthentication` to set the Profile and Permissions types.

```typescript
import { useAuthentication as useAuthenticationBase } from '@resourge/vue3-use-authentication'
import Permissions from '../permissions/Permissions' // Replace with your actual file path from your permissions file
import { Profile } from './User' // Replace with your actual file path from you user profile

// Use the useAuthenticationBase function to access the authentication
export default function useAuthentication(){
    return useAuthenticationBase<Profile, Permissions>()
}
```

`Permissions.ts`

```typescript
export default class Permissions {
  isAdmin: boolean;
  isUser: boolean;

  constructor(roles: string[] = []) {
    // Define your permissions here based on the user roles
    // Complete the implementation based on your application's requirements
  }
}

```

Wrapper for the `usePermissions` to set the Profile and Permissions types.
  
  ```typescript
import { usePermissions as usePermissionsBase } from '@resourge/vue3-use-authentication'
import Permissions from '../permissions/Permissions' // Replace with your actual file path from your permissions file
import { Profile } from './User' // Replace with your actual file path from you user profile

// Use the usePermissionsBase function to access the permissions
export default function usePermissions(){
    return usePermissionsBase<Profile, Permissions>()
}
```

`useAuthentication.ts` can be used in your components to access the user's authentication state.

```javascript
import { defineComponent } from 'vue';
import useAuthentication from './shared/authentication/user/useAuthentication'; // Replace with your actual file path

export default defineComponent({
  setup() {
    const { isAuthenticated, user } = useAuthentication();

    // Use isAuthenticated and user in your component

    return {
      isAuthenticated,
      user
    };
  }
});
```

`usePermissions` can be used in your components to check if a user has a specific permission.

```javascript
import { defineComponent } from 'vue';
import usePermissions from './shared/authentication/user/usePermissions'; // Replace with your actual file path

export default defineComponent({
  setup() {
    const { isUser } = usePermissions();
    // Use hasPermission in your component
    return {
      isUser
    };
  }
});

```

`useAuthenticationStorage` can be used to access the user's authentication state outside of the components example (Router).

```javascript
import { useAuthenticationStorage } from '@resourge/vue3-use-authentication';
import { Profile } from './User'; // Replace with your actual file path
import Permissions from './Permissions'; // Replace with your actual file path

const { isAuthenticated, user } = useAuthenticationStorage<Profile, Permissions>();
```

### Login and Logout

You can use the `useAuthentication` hook to login and logout a user.

```javascript
import { defineComponent } from 'vue';
import useAuthentication from './shared/authentication/user/useAuthentication'; // Replace with your actual file path

export default defineComponent({
  setup() {
    const { login, logout } = useAuthentication();

    // login example
    login(new Profile(), new Permissions(), 'token', 'cookie');

    // logout example
    logout();

    return {
      login,
      logout
    };
  }
});
```

For more detailed usage instructions, refer to the [documentation](#documentation).

## Documentation

For comprehensive documentation and usage examples, visit the [Vue 3 Authentication documentation](https://resourge.vercel.app/docs/vue3-use-authentication/intro).

## Contributing

Contributions to Vue 3 Authentication are welcome! To contribute, please follow the [contributing guidelines](CONTRIBUTING.md).

## License

Vue 3 Authentication is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact the maintainers:
- GitHub: [Resourge](https://github.com/resourge)
