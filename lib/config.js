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
            'arg-spread': {
                order: 3,
                title: 'arg-spread',
                description: 'use of `apply()` to spread operator',
                type: 'boolean',
                default: true
            },
            'obj-method': {
                order: 4,
                title: 'obj-method',
                description: 'function values in object to methods',
                type: 'boolean',
                default: true
            },
            'obj-shorthand': {
                order: 5,
                title: 'obj-shorthand',
                description: '`{foo: foo}` to `{foo}`',
                type: 'boolean',
                default: true
            },
            'no-strict': {
                order: 6,
                title: 'no-strict',
                description: 'removal of "use strict" directives',
                type: 'boolean',
                default: true
            },
            commonjs: {
                order: 7,
                title: 'commonjs',
                description: 'CommonJS module definition to ES6 modules',
                type: 'boolean',
                default: true
            },
            'class': {
                order: 8,
                title: 'class',
                description: 'function/prototypes to classes',
                type: 'boolean',
                default: true
            },
            template: {
                order: 9,
                title: 'template',
                description: 'string concatenation to template strings',
                type: 'boolean',
                default: true
            },
            'default-param': {
                order: 10,
                title: 'default-param',
                description: 'default parameters instead of `a = a || 2`',
                type: 'boolean',
                default: true
            },
            exponent: {
                order: 11,
                title: 'exponent',
                description: '`Math.pow()` to `**` operator (ES7)',
                type: 'boolean',
                default: false
            },
            'multi-var': {
                order: 12,
                title: 'multi-var',
                description: 'single `var x,y;` declaration to `var x; var y;`',
                type: 'boolean',
                default: false
            }
        }
    },
    ignoreWarnings: {
        title: 'Ignore warnings during conversion',
        type: 'boolean',
        description: 'Show warnings, but still apply the changes',
        default: false
    }
}
