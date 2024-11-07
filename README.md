# Frontend Developer Test at PT. Dlabs Indonesia Infotech
CMS Content management system administrator dashboard for user.

## DEMO APP

[frontend-test-dlabs.vercel.com](https://frontend-test-dlabs.vercel.app)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TypeScript

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Database Storage Local

- for save data storage local browser I choose localStorage. collaborate state management `pinia` includes `persistedstate` with auto save to localStorage browser.

## Minimum Requirements (Modules, Library, Plugin)

|Module                 |Version                      |
|-----------------------|-----------------------------|
|Node.js                |20.16.0                     |
|Typescript             |5.4.0                       |
|Vue.js                 |3.4.29                      |
|Axios                  |1.7.2                       |
|Pinia                  |2.1.7                       |
|Mitt                   |3.0.1                       |
|Ant Design Vue         |4.2.3                       |
|TailwindCSS            |3.4.4                       |
|Vite                   |5.3.1                       |
|SASS                   |1.77.6                      |
|Vite                   |5.3.1                       |
|Jest                   |27.0.5                      |
|Vitest                 |1.6.0                       |
|Eslint                 |8.57.0                      |

## Environment
- mode `PRODUCTION`
  - Check on file `.env.production`

- mode `DEVELOPMENT`
  - Check on file `.env.development`

## Project Setup

```sh
npm install
```

## Compile and Hot-Reload for Development mode

```sh
npm run dev
```

## Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Unit Testing & Coverage
  - To run unit test
    - Run `npm run test`
- To run test coverage
  - Run `npm run coverage`

## Deploy And Build App without Docker Compose

- To build mode 
  <mark style="background-color: #b91c1c; color: #fff; padding: 4px; border-radius: 5px;">
    PRODUCTION
  </mark>
  - Run `npm run deploy:production`

- To build mode
  <mark style="background-color: #221cb9; color: #fff; padding: 4px; border-radius: 5px;">
    DEVELOPMENT
  </mark>
  - Run `npm run deploy:development`

After finished check directory `/dist`.

## Build App with Docker compose

- To build mode
  <mark style="background-color: #b91c1c; color: #fff; padding: 4px; border-radius: 5px;">
    PRODUCTION
  </mark>
  - Run `make build-production`
  - To start app `make start-production`
  - To stop container `make stop-production`

- To build mode
  <mark style="background-color: #221cb9; color: #fff; padding: 4px; border-radius: 5px;">
    DEVELOPMENT
  </mark>
  - Run `make build-development`
  - To start app `make start-development`
  - To stop container `make stop-development`

## Design Pattern Sturcture Project

- For this project I use pattern Atomic Design 

## Structure Application Directory

```md
frontend-test-dlabs/
├── .husky/
│   └── pre-commit
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── dist/
│   ├── .vite
│   ├── assets
│   ├── favicon.ico
│   └── index.html
├── docker/
│   ├── development
│   │   ├── docker-compose.yml
│   │   └── Dockerfile
│   ├── production
│   │   ├── docker-compose.yml
│   │   └── Dockerfile
├── public
│   ├── favicon.ico
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── svg/
│   ├── components/
│   │   ├── Atoms/
│   │   ├── Molecules
│   │   ├── Organisms
│   │   ├── Pages
│   │   └── Templates
│   │   │   ├── Admin/
│   │   │   ├── Auth/
│   │   │   └── PageNotFound
│   ├── configurations/
│   │   ├── constants.ts
│   ├── interfaces/
│   │   ├── app.ts
│   ├── router/
│   │   ├── index.ts
│   ├── services/
│   │   ├── _axios.ts
│   │   ├── _http.ts
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── stores/
│   │   ├── auth.ts
│   │   └── user.ts
│   ├── styles/
│   │   ├── main.scss
│   │   └── tailwindcss.css
│   ├── types/
│   │   ├── shims-vue.d.ts
│   │   └── table.ts
│   ├── utils/
│   │   └── app.ts
│   ├── App.vue
│   ├── auto-imports.d.ts
│   └── main.ts
├── tests/
│   ├── unit/
│   │   └── index.test.js
├── .dockerignore
├── .env.development
├── .env.production
├── .env.staging
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc.json
├── components.d.ts
├── env.d.ts
├── index.html
├── Makefile
├── nginx.conf
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── sonar-project.properties
└── tailwind.config.js
└── tsconfig.json
└── tsconfig.node.json
└── vite.config.ts
└── vitest.config.ts
```