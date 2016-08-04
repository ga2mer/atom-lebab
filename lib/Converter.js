"use babel";
import lebab from 'lebab';

export default class Converter {
    constructor() {
        this.editor = atom.workspace.getActiveTextEditor();
    }

    convert() {
        const isSelected = this.editor.getSelectedText().length > 0;
        const {code, warnings} = lebab.transform(isSelected ? this.editor.getSelectedText() : this.editor.getText(), this.getTransforms());
        if (warnings.length == 0) {
            this.setText(code, isSelected);
        } else {
            this.addWarnings(warnings, isSelected);
            if (atom.config.get('atom-lebab.ignoreWarnings')) {
                this.setText(code, isSelected);
            }
        }
    }

    getTransforms() {
        return Object.entries(atom.config.get('atom-lebab.transforms'))
            .filter(([name, enabled]) => enabled)
            .map(([name]) => name);
    }

    setText(code, isSelected) {
        if (isSelected) {
            const buffer = this.editor.getSelectedBufferRange();
            this.editor.setTextInBufferRange(buffer, code);
        } else {
            this.editor.setText(code);
        }
    }

    addWarnings(warnings, isSelected) {
        const startSelectedLineNumber = isSelected && this.editor.getSelectedBufferRange().start.row;
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
