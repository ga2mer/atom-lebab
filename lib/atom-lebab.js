var lebab = require('lebab');
var transforms = {
    'class': true,
    'template': true,
    'arrow': true,
    'let': true,
    'default-param': true,
    'arg-spread': true,
    'obj-method': true,
    'obj-shorthand': true,
    'no-strict': true,
    'commonjs': true
};
var transformer = new lebab.Transformer(transforms);
module.exports = {
    activate: function() {
        atom.commands.add("atom-workspace", "atom-lebab:convert", this.convert);
    },

    convert: function(event) {
        try {
            var e = atom.workspace.getActiveTextEditor();
            if (e.getSelectedText().length > 0) {
                var converted = transformer.run(e.getSelectedText());
                var buffer = e.getSelectedBufferRange();
                e.setTextInBufferRange(buffer, converted);
            } else {
                var converted = transformer.run(e.getText());
                e.setText(converted);
            }
        } catch(e) {}
    }
};
