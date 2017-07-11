// Karma configuration
// Generated on Mon Jul 10 2017 11:34:45 GMT+1200 (New Zealand Standard Time)

module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};