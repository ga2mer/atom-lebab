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
            'arg-rest': {
                order: 4,
                title: 'arg-rest',
                description: 'use of arguments to `function(...args)`',
                type: 'boolean',
                default: true
            },
            'arg-spread': {
                order: 5,
                title: 'arg-spread',
                description: 'use of `apply()` to spread operator',
                type: 'boolean',
                default: true
            },
            'obj-method': {
                order: 6,
                title: 'obj-method',
                description: 'function values in object to methods',
                type: 'boolean',
                default: true
            },
            'obj-shorthand': {
                order: 7,
                title: 'obj-shorthand',
                description: '`{foo: foo}` to `{foo}`',
                type: 'boolean',
                default: true
            },
            'no-strict': {
                order: 8,
                title: 'no-strict',
                description: 'removal of "use strict" directives',
                type: 'boolean',
                default: true
            },
            commonjs: {
                order: 9,
                title: 'commonjs',
                description: 'CommonJS module definition to ES6 modules',
                type: 'boolean',
                default: true
            },
            'class': {
                order: 10,
                title: 'class',
                description: 'function/prototypes to classes',
                type: 'boolean',
                default: true
            },
            template: {
                order: 11,
                title: 'template',
                description: 'string concatenation to template strings',
                type: 'boolean',
                default: true
            },
            'default-param': {
                order: 12,
                title: 'default-param',
                description: 'default parameters instead of `a = a || 2`',
                type: 'boolean',
                default: true
            },
            exponent: {
                order: 13,
                title: 'exponent',
                description: '`Math.pow()` to `**` operator (ES7)',
                type: 'boolean',
                default: false
            },
            'multi-var': {
                order: 14,
                title: 'multi-var',
                description: 'single `var x,y;` declaration to `var x; var y;`',
                type: 'boolean',
                default: false
            },
            'includes': {
                order: 15,
                title: 'includes',
                description: '`array.indexOf(foo) !== -1` to `array.includes(foo)` (ES7)',
                type: 'boolean',
                default: false
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
