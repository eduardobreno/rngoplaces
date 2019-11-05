# RNGoPlaces

Projeto React Native utilizando API do Google Places

## Index

0. [Release](#release)
1. [Installation](#installation)
1. [Run](#run)
1. [Tests](#tests)
1. [Dependencies](#dependencies)
1. [Other infos](#other-infos)

## Checklist

### Requisitos Mínimos

- [x] Tela de boas vindas para o usuário.
- [x] Exibir o mapa e mostrar a posição do usuário.
- [x] Mostrar lugares próximos do usuário.
- [x] Exibir as informações do local ao clicar nele.
- [x] Teste unitário do componente principal.

### Requisitos adicionais

- [x] Carrosel de lugares ordenados por proximidade.
- [x] Buscar lugares em outras partes do mapa ao arrastar.

## Release

<a name="release"></a>

- APK: https://github.com/eduardobreno/rngoplaces/releases/tag/0.0.1

![](gifs/demo1.gif) ![](gifs/demo2.gif)

<a name="installation"></a>

## Installation

#### Programas e bibliotecas usedas:

1. JDK 8
2. react-native-cli: 2.0.1
3. Node: 12.5.0
4. Npm: 6.9.0
5. SDK Android Studio: 23 / 27 / 28
6. Android Studio: 3.4
7. Xcode: 10.3
8. Visual Studio Code

#### Enviroment:

- https://facebook.github.io/react-native/docs/getting-started (aba Building Projects with Native Code)

#### Install project dependeces:

- `npm install` (or `yarn`)

<a name="run"></a>

## Run

#### To run:

- `npm run android` ou abra o projeto `.\android` no Android Studio
- `npm run ios` ou abra o projeto `rngoplaces.xcworkspace` na pasta `.\ios` no Xcode

## Test

<a name="tests"></a>

#### To test:

- `yarn test`

<a name="dependencies"></a>

## Dependencies

- ESLint/TSLint
- TypeScript
- Jest
- i18n : https://github.com/fnando/i18n-js
- Routes: https://reactnavigation.org/
- UI: https://nativebase.io/

- Maps: https://github.com/react-native-community/react-native-maps
- Carousel: https://github.com/archriss/react-native-snap-carousel

<a name="other-infos"></a>

## Other informations

- Imagem de fundo da tela inicial retirado de: https://www.pexels.com/photo/map-atlas-south-america-52502/
- Projeto testado em emulador e Smartphone Android.
