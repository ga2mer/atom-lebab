"use babel";
import {Point} from 'atom';

/**
 * Simpler API for interacting with the editor.
 */
export default class EditorFacade {
    constructor(editor) {
        this.editor = editor;
    }

    isSelected() {
        return this.editor.getSelectedText().length > 0;
    }

    /**
     * Returns the full buffer or just the selected portion.
     * @return {String}
     */
    getText() {
        return this.isSelected() ? this.editor.getSelectedText() : this.editor.getText();
    }

    /**
     * Sets the full buffer or just the selected portion.
     * @param {String} text
     */
    setText(text) {
        if (this.isSelected()) {
            this.editor.setTextInBufferRange(this.editor.getSelectedBufferRange(), text);
        } else {
            this.editor.setText(text);
        }
    }

    /**
     * Returns the first line of selection or 0 when no selection exists
     * @return {Number}
     */
    getStartLine() {
        return this.isSelected() ? this.editor.getSelectedBufferRange().start.row : 0;
    }

    /**
     * Positions the cursor at given line
     * @param {Number} line
     */
    setCursorLinePosition(line) {
        this.editor.setCursorBufferPosition(new Point(line, 0));
    }
}
