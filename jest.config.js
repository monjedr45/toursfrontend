module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
      },
      transformIgnorePatterns: [
        "node_modules/(?!(my-module)/)"
      ],
  };