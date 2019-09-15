// {
//   "preset": "react-native",
//   "collectCoverage": true,
//   "moduleDirectories": ["node_modules", "app"],
//   "transformIgnorePatterns": [
//     "node_modules/(?!react-native|@shoutem/theme|@shoutem/animation|@shoutem/ui|tcomb-form-native)"
//   ],
//   "coveragePathIgnorePatterns": ["/node_modules/", "/jest"]
// }
module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  setupFiles: ["<rootDir>/jest.setup.js"]
};
