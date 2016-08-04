"use babel";
import lebab from 'lebab';

export default class Converter {
    constructor() {
        this.editor = atom.workspace.getActiveTextEditor();
    }

    convert() {
        const {code, warnings} = lebab.transform(this.getText(), this.getTransforms());

        // Display warnings when there are some
        if (warnings.length > 0) {
            this.addWarnings(warnings);
        }

        // Apply changes when there are no warnings or we're ignoring them
        if (warnings.length === 0 || atom.config.get('atom-lebab.ignoreWarnings')) {
            this.setText(code);
        }
    }

    getTransforms() {
        return Object.entries(atom.config.get('atom-lebab.transforms'))
            .filter(([name, enabled]) => enabled)
            .map(([name]) => name);
    }

    isSelected() {
        return this.editor.getSelectedText().length > 0;
    }

    getText() {
        return this.isSelected() ? this.editor.getSelectedText() : this.editor.getText();
    }

    setText(code) {
        if (this.isSelected()) {
            this.editor.setTextInBufferRange(this.editor.getSelectedBufferRange(), code);
        } else {
            this.editor.setText(code);
        }
    }

    addWarnings(warnings) {
        const startSelectedLineNumber = this.isSelected() && this.editor.getSelectedBufferRange().start.row;
        const lines = warnings.map(({line, msg, type}) => {
            const realLine = this.isSelected() ? startSelectedLineNumber + line : line;
            return `[${type}] line ${realLine}: ${msg}`;
        });
        atom.notifications.addWarning('Lebab transform warning', {
            dismissable: true,
            detail: lines.join("\n"),
        });
    }
}
