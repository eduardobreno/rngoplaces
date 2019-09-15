# Shhare it

This is a WIP project: A app to share medias using firebase from google

## Index

1. [Installation](#installation)
2. [Run](#run)
3. [Code structure](#code-structure)
4. [Lint](#lint)
5. [Dependencies](#dependencies)
6. [Other infos](#other-infos)

<a name="installation"></a>

## Installation

#### Programas and libs used:

1. JDK 8
2. react-native-cli: 2.0.1
3. Node: 12.5.0
4. Npm: 6.9.0
5. SDK Android Studio: 23 / 27 / 28
6. Android Studio: 3.4
7. Xcode: 10.3
8. Visual Studio Code

#### Enviroment:

- https://facebook.github.io/react-native/docs/getting-started (tab Building Projects with Native Code)

#### Install project dependeces:

- `npm install` (or `yarn`)

<a name="run"></a>

## Run

#### To run:

- `npm run android` or open the project file `.\android` on Android Studio
- `npm run ios` or open the project file `shhareit.xcworkspace` on folder `.\ios` on Xcode

In order to run app, you'll need valid GoogleService-Info.plist and google-services.json files. The xcode/android project contains a fake plist files without real values, but can be replaced with real plist files. To get your own GoogleService-Info.plist/google-services.json files:

Go to the Firebase Console
Create a new Firebase project, if you don't already have one
Create a new Firebase app with the app's bundle identifier (e.g. br.com.ejstudio.apps.shhareit)
Download the resulting GoogleService-Info.plist/google-services.json and replace the appropriate dummy plist file (e.g. in android/app/google-services.json or ios/GoogleService-Info.plist);

<a name="code-structure"></a>

## Code structure

- WIP

<a name="lint"></a>

## Lint

- WIP
  <a name="dependencies"></a>

## Dependencies

- ESLint:
- TypeScript:

- i18n: https://github.com/fnando/i18n-js
- Routes: https://reactnavigation.org/

- UI: https://nativebase.io/

<a name="other-infos"></a>

## Other informations

- This project is for study only
