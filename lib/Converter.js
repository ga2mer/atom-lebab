"use babel";
import lebab from 'lebab';
import {Point} from 'atom';
import WarningsPanel from './WarningsPanel';

export default class Converter {
    constructor() {
        this.editor = atom.workspace.getActiveTextEditor();
        this.warningsPanel = new WarningsPanel();
    }

    convert(transforms) {
        const {code, warnings} = lebab.transform(this.getText(), transforms);

        this.showWarnings(warnings);

        // Apply changes when there are no warnings or we're ignoring them
        if (warnings.length === 0 || atom.config.get('lebab.ignoreWarnings')) {
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
        this.warningsPanel.show(warnings.map(this.offsetLine, this), (line) => {
            this.editor.setCursorBufferPosition(new Point(line - 1, 0));
        });
    }

    offsetLine({line, msg, type}) {
        return {line: this.getStartLine() + line, msg, type};
    }

    getStartLine(line) {
        return this.isSelected() ? this.editor.getSelectedBufferRange().start.row : 0;
    }
}
