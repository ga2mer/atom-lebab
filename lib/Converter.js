"use babel";
import lebab from 'lebab';
import WarningsPanel from './WarningsPanel';
import EditorFacade from './EditorFacade';

export default class Converter {
    constructor() {
        this.editor = new EditorFacade(atom.workspace.getActiveTextEditor());
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
        this.warningsPanel.show(warnings.map(this.offsetLine, this), (line) => {
            this.editor.setCursorLinePosition(line - 1);
        });
    }

    offsetLine({line, msg, type}) {
        return {line: this.editor.getStartLine() + line, msg, type};
    }
}
