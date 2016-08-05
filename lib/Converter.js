"use babel";
import lebab from 'lebab';

export default class Converter {
    constructor() {
        this.editor = atom.workspace.getActiveTextEditor();
    }

    convert(transforms) {
        const {code, warnings} = lebab.transform(this.getText(), transforms);

        // Display warnings when there are some
        if (warnings.length > 0) {
            this.showWarnings(warnings);
        }

        // Apply changes when there are no warnings or we're ignoring them
        if (warnings.length === 0 || atom.config.get('atom-lebab.ignoreWarnings')) {
            this.setText(code);
        }
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

    showWarnings(warnings) {
        atom.notifications.addWarning('Lebab transform warning', {
            dismissable: true,
            detail: warnings.map(w => this.formatWarning(w)).join("\n"),
        });
    }

    formatWarning({line, msg, type}) {
        return `[${type}] line ${this.getStartLine() + line}: ${msg}`;
    }

    getStartLine(line) {
        return this.isSelected() ? this.editor.getSelectedBufferRange().start.row : 0;
    }
}
