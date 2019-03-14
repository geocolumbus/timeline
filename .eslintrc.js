module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "indent": 0,
        "quotes": ["error", "double", {"allowTemplateLiterals": true}],
        "padded-blocks": "off",
        "no-trailing-spaces": ["error", {"skipBlankLines": true}],
        "space-before-function-paren": ["error", {"anonymous": "ignore", "named": "ignore", "asyncArrow": "ignore"}],
        "prefer-const": ["error"],
        "object-curly-spacing": "off",
        "key-spacing": "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    globals: {
        cordova: true,
        StatusBar: true,
        MobileAccessibility: true,
        NativeStorage: true
    }
}
