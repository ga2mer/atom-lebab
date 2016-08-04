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
        if (editor.getSelectedText().length > 0) {
            const {code, warnings} = lebab.transform(editor.getSelectedText(), transforms);
            if (warnings.length == 0) {
                const buffer = editor.getSelectedBufferRange();
                editor.setTextInBufferRange(buffer, code);
            } else {
                addWarnings(warnings);
            }
        } else {
            const {code, warnings} = lebab.transform(editor.getText(), transforms);
            if (warnings.length == 0) {
                editor.setText(code);
            } else {
                addWarnings(warnings);
            }
        }
    } catch (error) {}
}

export function addWarnings(warnings) {
    let detail = "";
    warnings.forEach((warning, index) => {
        const {line, msg, type} = warning;
        detail += `${index != 0 && '\n' || ''} [${type}] line ${line}: ${msg}`;
    });
    atom.notifications.addWarning('Lebab transform warning', {
        dismissable: true,
        detail
    });
}
