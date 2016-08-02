var lebab = require('lebab');
var transforms = [
    'class',
    'template',
    'arrow',
    'let',
    'default-param',
    'arg-spread',
    'obj-method',
    'obj-shorthand',
    'no-strict',
    'commonjs'
];

module.exports = {
    activate: function() {
        atom.commands.add("atom-workspace", "atom-lebab:convert", this.convert);
    },

    convert: function(event) {
        try {
            var e = atom.workspace.getActiveTextEditor();
            if (e.getSelectedText().length > 0) {
                var converted = lebab.transform(e.getSelectedText(), transforms).code;
                var buffer = e.getSelectedBufferRange();
                e.setTextInBufferRange(buffer, converted);
            } else {
                var converted = lebab.transform(e.getText(), transforms).code;
                e.setText(converted);
            }
        } catch(e) {}
    }
};
