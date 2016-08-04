"use babel";
import lebab from 'lebab';

export {default as config} from './config';

export function activate() {
    atom.commands.add("atom-workspace", "atom-lebab:convert", convert);
}

export function convert(event) {
    try {
        const editor = atom.workspace.getActiveTextEditor();
        const transforms = [];
        const transformsConfig = atom.config.get('atom-lebab.transforms');
        Object.keys(transformsConfig).forEach((item) => {
            if (transformsConfig[item]) {
                transforms.push(item);
            }
        });
        const isSelected = editor.getSelectedText().length > 0;
        const {code, warnings} = lebab.transform(isSelected && editor.getSelectedText() || editor.getText(), transforms);
        if (warnings.length == 0) {
            setText(code, isSelected, editor);
        } else {
            addWarnings(warnings, isSelected, editor);
            if (atom.config.get('atom-lebab.ignoreWarnings')) {
                setText(code, isSelected, editor);
            }
        }
    } catch (error) {}
}

function setText(code, isSelected, editor) {
    if (isSelected) {
        const buffer = editor.getSelectedBufferRange();
        editor.setTextInBufferRange(buffer, code);
    } else {
        editor.setText(code);
    }
}

function addWarnings(warnings, isSelected, editor) {
    let detail = "";
    const startSelectedLineNumber = isSelected && editor.getSelectedBufferRange().start.row;
    warnings.forEach((warning, index) => {
        const {line, msg, type} = warning;
        const realLine = isSelected && startSelectedLineNumber + line || line;
        detail += `${index != 0 && '\n' || ''} [${type}] line ${realLine}: ${msg}`;
    });
    atom.notifications.addWarning('Lebab transform warning', {
        dismissable: true,
        detail
    });
}
