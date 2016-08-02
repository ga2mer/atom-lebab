var lebab = require('lebab');
var config = require('./config');
var activate = () => {
    atom.commands.add("atom-workspace", "atom-lebab:convert", convert);
};
var convert = (event) => {
    try {
        var e = atom.workspace.getActiveTextEditor();
        var transforms = [];
        var transformsConfig = atom.config.get('atom-lebab.transforms');
        Object.keys(transformsConfig).forEach((item) => {
            if (transformsConfig[item]) {
                transforms.push(item);
            }
        });
        if (e.getSelectedText().length > 0) {
            var {code, warnings} = lebab.transform(e.getSelectedText(), transforms);
            if (warnings.length == 0) {
                var buffer = e.getSelectedBufferRange();
                e.setTextInBufferRange(buffer, code);
            } else {
                addWarnings(warnings);
            }
        } else {
            var {code, warnings} = lebab.transform(e.getText(), transforms);
            if (warnings.length == 0) {
                e.setText(code);
            } else {
                addWarnings(warnings);
            }
        }
    } catch (e) {}
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
