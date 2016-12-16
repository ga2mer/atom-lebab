"use babel";

export default {
    transforms: {
        title: 'Transforms',
        type: 'object',
        order: -1,
        properties: {
            arrow: {
                order: 1,
                title: 'arrow',
                description: 'callbacks to arrow functions',
                type: 'boolean',
                default: true
            },
            'let': {
                order: 2,
                title: 'let',
                description: '`var` to `let`/`const`',
                type: 'boolean',
                default: true
            },
            'for-of': {
                order: 3,
                title: 'for-of',
                description: 'for loop to for-of loop',
                type: 'boolean',
                default: true
            },
            'for-each': {
                order: 4,
                title: 'for-each',
                description: 'for loop to `Array.forEach()`',
                type: 'boolean',
                default: true
            },
            'arg-rest': {
                order: 5,
                title: 'arg-rest',
                description: 'use of arguments to `function(...args)`',
                type: 'boolean',
                default: true
            },
            'arg-spread': {
                order: 6,
                title: 'arg-spread',
                description: 'use of `apply()` to spread operator',
                type: 'boolean',
                default: true
            },
            'obj-method': {
                order: 7,
                title: 'obj-method',
                description: 'function values in object to methods',
                type: 'boolean',
                default: true
            },
            'obj-shorthand': {
                order: 8,
                title: 'obj-shorthand',
                description: '`{foo: foo}` to `{foo}`',
                type: 'boolean',
                default: true
            },
            'no-strict': {
                order: 9,
                title: 'no-strict',
                description: 'removal of "use strict" directives',
                type: 'boolean',
                default: true
            },
            commonjs: {
                order: 10,
                title: 'commonjs',
                description: 'CommonJS module definition to ES6 modules',
                type: 'boolean',
                default: true
            },
            'class': {
                order: 11,
                title: 'class',
                description: 'function/prototypes to classes',
                type: 'boolean',
                default: true
            },
            template: {
                order: 12,
                title: 'template',
                description: 'string concatenation to template strings',
                type: 'boolean',
                default: true
            },
            'default-param': {
                order: 13,
                title: 'default-param',
                description: 'default parameters instead of `a = a || 2`',
                type: 'boolean',
                default: true
            },
            exponent: {
                order: 14,
                title: 'exponent',
                description: '`Math.pow()` to `**` operator (ES7)',
                type: 'boolean',
                default: false
            },
            'multi-var': {
                order: 15,
                title: 'multi-var',
                description: 'single `var x,y;` declaration to `var x; var y;`',
                type: 'boolean',
                default: false
            },
            'includes': {
                order: 16,
                title: 'includes',
                description: '`array.indexOf(foo) !== -1` to `array.includes(foo)` (ES7)',
                type: 'boolean',
                default: false
            },
            'destruct-param': {
                order: 17,
                title: 'destruct-param',
                description: 'use destructuring for objects in function parameters',
                type: 'boolean',
                default: true
            }
        }
    },
    ignoreWarnings: {
        title: 'Ignore warnings during conversion',
        type: 'boolean',
        description: 'Show warnings, but still apply the changes',
        default: true
    }
}
