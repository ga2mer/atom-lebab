var lebab = require('lebab');
var config = require('./config');
var activate = () => {
    atom.commands.add("atom-workspace", "atom-lebab:convert", convert);
};
var convert = (event) => {
    try {
        var editor = atom.workspace.getActiveTextEditor();
        var transforms = [];
        var transformsConfig = atom.config.get('atom-lebab.transforms');
        Object.keys(transformsConfig).forEach((item) => {
            if (transformsConfig[item]) {
                transforms.push(item);
            }
        });
        if (editor.getSelectedText().length > 0) {
            var {code, warnings} = lebab.transform(editor.getSelectedText(), transforms);
            if (warnings.length == 0) {
                var buffer = editor.getSelectedBufferRange();
                editor.setTextInBufferRange(buffer, code);
            } else {
                addWarnings(warnings);
            }
        } else {
            var {code, warnings} = lebab.transform(editor.getText(), transforms);
            if (warnings.length == 0) {
                editor.setText(code);
            } else {
                addWarnings(warnings);
            }
        }
    } catch (error) {}
};
var addWarnings = (warnings) => {
    var detail = "";
    warnings.forEach((warning, index) => {
        var {line, msg, type} = warning;
        detail += `${index != 0 && '\n' || ''} [${type}] line ${line}: ${msg}`;
    });
    atom.notifications.addWarning('Lebab transform warning', {
        dismissable: true,
        detail
    });
};
module.exports = {
    config,
    activate,
    convert,
    addWarnings
};
