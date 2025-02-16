# journey-x

Seamlessly organize tours, assign drivers with ease, and ensure perfect location matching.
Simplify your workflow and keep everything in sync!🚀

## Tech Stack

- [Vue.js](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/) on the front end.
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [Convex](https://www.convex.dev/) to handle the backend seamlessly.
- [Vercel](https://vercel.com/) for fast and reliable deployment.
- [Vitest](https://vitest.dev/) for testing to ensure code quality.
- [Husky](https://typicode.github.io/husky/) for pre-commit hooks to maintain a clean and consistent codebase.

## Project Setup

```sh
pnpm install # will install dependencies, prepare husky & copy env files.
```

> [!NOTE]
> Environment variables are for development purposes only, so feel free to use them as needed.

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build # this will run with -s, if tests fails, the build will fail.
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

> [!IMPORTANT]  
> Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) when commiting.

## Deployment

You can deploy simply by pushing to the `main` branch.

> [!WARNING]  
> Tests should pass in order to be able to commit or build.

## Roadmap

- [x] Running and working app with base++ requirements.
- [ ] Add a toast message to relfect CRUD operations.
- [ ] Add more tests.
- [ ] Add Sentry.
- [ ] Add Authentication with [Clerk](https://clerk.com/docs/quickstarts/vue).
- [ ] Some cleanup if necessary for `<TourForm />`, things like validation and think of more composables.
- [ ] For more fun, add [commitlint](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#getting-started).
- [ ] Debounce on Search? (It would be more valuable if we are calling APIs tho)

## Q&A

1. Why not using Pinia?

Pinia is a powerful option, but it might be overkill for a small app. For simpler state sharing, using a global state can be more efficient than passing props or relying on Vue's provide and inject.

2. Why using an Input for Driver's location, and a dropdown list for Tour?

I used an input field for the Driver's location to easily validate that no numbers are entered, which isn't possible on a predefined dropdown.
