"use babel";
import lebab from 'lebab';
import WarningsPanel from './WarningsPanel';
import EditorFacade from './EditorFacade';

export default class Converter {
    constructor(editor) {
        this.editor = new EditorFacade(editor);
        this.warningsPanel = new WarningsPanel();
    }

    convert(transforms) {
        const {code, warnings} = lebab.transform(this.editor.getText(), transforms);

        this.showWarnings(warnings);

        // Apply changes when there are no warnings or we're ignoring them
        if (warnings.length === 0 || atom.config.get('lebab.ignoreWarnings')) {
            this.editor.setText(code);
        }
    }

    showWarnings(warnings) {
        this.warningsPanel.render(warnings.map(this.offsetLine, this), (line) => {
            this.editor.setCursorLinePosition(line - 1);
        });
    }

    getWarningsPanel() {
        return this.warningsPanel;
    }

    offsetLine({line, msg, type}) {
        return {line: this.editor.getStartLine() + line, msg, type};
    }
}
