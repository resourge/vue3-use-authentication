# Vue 3 Authentication

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description

Provide a brief description of the project, highlighting its purpose, main features, and benefits.

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

`User.ts`

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


`useAuthentication.ts`

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

`usePermissions.ts`
  
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
import useAuthentication from './shared/authentication/user/usePermissions'; // Replace with your actual file path

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

## Documentation

Link to the project's documentation, if available, or provide information on where users can find more detailed documentation and resources.

## Contributing

Contributions to Vue 3 Authentication are welcome! To contribute, please follow the [contributing guidelines](CONTRIBUTING.md).

## License

Include licensing information for the project, specifying the license under which it is distributed.

## Contact

Provide contact information for the project maintainers, including email addresses, social media profiles, or links to issue trackers or forums where users can ask questions and seek support.
