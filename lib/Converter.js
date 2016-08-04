"use babel";
import lebab from 'lebab';

export default class Converter {
    convert() {
        const editor = atom.workspace.getActiveTextEditor();
        const isSelected = editor.getSelectedText().length > 0;
        const {code, warnings} = lebab.transform(isSelected ? editor.getSelectedText() : editor.getText(), this.getTransforms());
        if (warnings.length == 0) {
            this.setText(code, isSelected, editor);
        } else {
            this.addWarnings(warnings, isSelected, editor);
            if (atom.config.get('atom-lebab.ignoreWarnings')) {
                this.setText(code, isSelected, editor);
            }
        }
    }

    getTransforms() {
        return Object.entries(atom.config.get('atom-lebab.transforms'))
            .filter(([name, enabled]) => enabled)
            .map(([name]) => name);
    }

    setText(code, isSelected, editor) {
        if (isSelected) {
            const buffer = editor.getSelectedBufferRange();
            editor.setTextInBufferRange(buffer, code);
        } else {
            editor.setText(code);
        }
    }

    addWarnings(warnings, isSelected, editor) {
        const startSelectedLineNumber = isSelected && editor.getSelectedBufferRange().start.row;
        const lines = warnings.map((warning) => {
            const {line, msg, type} = warning;
            const realLine = isSelected ? startSelectedLineNumber + line : line;
            return `[${type}] line ${realLine}: ${msg}`;
        });
        atom.notifications.addWarning('Lebab transform warning', {
            dismissable: true,
            detail: lines.join("\n"),
        });
    }
}
