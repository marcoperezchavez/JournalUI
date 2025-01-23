# JournalUI

## Description

JournalUI is a React application that allows users to log in and view a list of journals. The application uses React Query for data management and React Bootstrap for UI design.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

Follow these steps to set up and run the application on your local environment:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/marcoperezchavez/JournalUI.git
   cd JournalUI

2 **Install dependencies**
 npm install

3 **Configure the vite.config.ts file**
// filepath: /c:/Users/MarcoP/source/repos/ReactAppNetCoreTestFE/vite.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})

4 **Run the application in development mode**
npm run dev

5 **Build the application for production**
npm run build
3 **Preview the built application**
npm run preview
6 **Run the tests**
npm test

**Functionality**

Sure, here is the complete 

README.md

 file in English:

```markdown
# JournalUI

## Description

JournalUI is a React application that allows users to log in and view a list of journals. The application uses React Query for data management and React Bootstrap for UI design.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

Follow these steps to set up and run the application on your local environment:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/marcoperezchavez/JournalUI.git
   cd JournalUI
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure the 

vite.config.ts

 file:**

   Ensure that the 

vite.config.ts

 file is correctly configured:

   ```typescript
   // filepath: /c:/Users/MarcoP/source/repos/ReactAppNetCoreTestFE/vite.config.ts
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'

   // https://vite.dev/config/
   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/setupTests.ts',
     },
   })
   ```

4. **Configure the `setupTests.ts` file:**

   Create a `setupTests.ts` file in the 

src

 directory and add the necessary configuration for `@testing-library/jest-dom`:

   ```typescript
   // filepath: /c:/Users/MarcoP/source/repos/ReactAppNetCoreTestFE/src/setupTests.ts
   import '@testing-library/jest-dom';
   ```

5. **Run the application in development mode:**

   ```sh
   npm run dev
   ```

6. **Build the application for production:**

   ```sh
   npm run build
   ```

7. **Preview the built application:**

   ```sh
   npm run preview
   ```

8. **Run the tests:**

   ```sh
   npm test
   ```

## Functionality

### Login

- The login page allows users to enter their username and password.
- If the credentials are correct, the user is redirected to the journals page and the information is saved in `localStorage`.
- If the credentials are incorrect, the role is saved as `user` in `localStorage`.

### Journal

- The journals page displays a list of journals fetched from an endpoint.
- Only users with the `admin` role can see the "Add New" button.

## Project Structure

- 

Login.tsx

: Login component.
- 

Journal.tsx

: Journal list component.
- 

LoginComponent.spec.tsx

: Unit tests for the login component.
- 

vite.config.ts

: Vite configuration.
- 

setupTests.ts

: Test setup configuration for `@testing-library/jest-dom`.

## Contribution

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
