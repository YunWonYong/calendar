import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tseslint,
            perfectionist,
        },
        rules: {
            "perfectionist/sort-imports": [
                "error",
                {
                    type: "alphabetical",
                    order: "asc",
                    ignoreCase: true,
                    specialCharacters: "keep",
                    internalPattern: ["^@/.+"],
                    newlinesBetween: 1,
                    newlinesInside: 0,
                    groups: [
                        "external-side-effect",
                        "external",

                        // 코드 파일 (개별 그룹으로 분리하여 빈 줄 적용)
                        "internal-code",
                        "parent-code",
                        "sibling-code",

                        // CSS 모듈
                        "internal-css-module",
                        "parent-css-module",
                        "sibling-css-module",

                        // 에셋
                        "internal-asset",
                        "parent-asset",
                        "sibling-asset",

                        // 타입
                        "internal-type",
                        "parent-type",
                        "sibling-type",

                        // 일반 CSS / 스타일
                        "internal-css",
                        "parent-css",
                        "sibling-css",
                    ],
                    customGroups: [
                        {
                            groupName: "external-side-effect",
                            anyOf: [
                                {
                                    selector: "side-effect",
                                    elementNamePattern: "^[^@./].+",
                                },
                            ],
                        },
                        // 1. Specific file types (CSS, Asset) - 구체적인 패턴을 먼저 매칭
                        {
                            groupName: "internal-css-module",
                            anyOf: [{ selector: "style", elementNamePattern: "^@/.+\\.module\\.css$" }],
                        },
                        {
                            groupName: "parent-css-module",
                            anyOf: [{ selector: "style", elementNamePattern: "^\\.\\./.+\\.module\\.css$" }],
                        },
                        {
                            groupName: "sibling-css-module",
                            anyOf: [{ selector: "style", elementNamePattern: "^\\./.+\\.module\\.css$" }],
                        },
                        {
                            groupName: "internal-css",
                            anyOf: [{ elementNamePattern: "^@/.+\\.css$" }],
                        },
                        {
                            groupName: "parent-css",
                            anyOf: [{ elementNamePattern: "^\\.\\./.+\\.css$" }],
                        },
                        {
                            groupName: "sibling-css",
                            anyOf: [{ elementNamePattern: "^\\./.+\\.css$" }],
                        },
                        {
                            groupName: "internal-asset",
                            anyOf: [{ elementNamePattern: "^@/.+\\.(png|jpe?g|gif|svg|webp|ico)$" }],
                        },
                        {
                            groupName: "parent-asset",
                            anyOf: [{ elementNamePattern: "^\\.\\./.+\\.(png|jpe?g|gif|svg|webp|ico)$" }],
                        },
                        {
                            groupName: "sibling-asset",
                            anyOf: [{ elementNamePattern: "^\\./.+\\.(png|jpe?g|gif|svg|webp|ico)$" }],
                        },
                        // 2. Types
                        {
                            groupName: "internal-type",
                            anyOf: [{ selector: "type", elementNamePattern: "^@/.+" }],
                        },
                        {
                            groupName: "parent-type",
                            anyOf: [{ selector: "type", elementNamePattern: "^\\.\\./.+" }],
                        },
                        {
                            groupName: "sibling-type",
                            anyOf: [{ selector: "type", elementNamePattern: "^\\./.+" }],
                        },
                        // 3. General Code (포괄적인 패턴이므로 가장 뒤에 배치)
                        {
                            groupName: "internal-code",
                            anyOf: [{ elementNamePattern: "^@/.+" }],
                        },
                        {
                            groupName: "parent-code",
                            anyOf: [{ elementNamePattern: "^\\.\\./.+" }],
                        },
                        {
                            groupName: "sibling-code",
                            anyOf: [{ elementNamePattern: "^\\./.+" }],
                        },
                    ],
                },
            ],
            "perfectionist/sort-named-imports": [
                "error",
                {
                    type: "alphabetical",
                    order: "asc",
                    ignoreCase: true,
                },
            ],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "import", next: "*" },
                { blankLine: "any", prev: "import", next: "import" }, // import 끼리는 perfectionist가 관리하도록 허용
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true
                },
            ],
        },
    },
];