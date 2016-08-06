"use babel";
import lebab from 'lebab';
import {Point} from 'atom';

export default class Converter {
    constructor() {
        this.editor = atom.workspace.getActiveTextEditor();
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
        // Close warnings panel, if open from previous time
        if (Converter.warningsPanel) {
            this.hideWarnings();
        }

        if (warnings.length === 0) {
            return;
        }

        // Store the panel in static property,
        // so it will live through different Converter instances
        Converter.warningsPanel = atom.workspace.addBottomPanel({
            item: this.createWarningsContainer(warnings)
        });
    }

    hideWarnings() {
        Converter.warningsPanel.destroy();
        Converter.warningsPanel = undefined;
    }

    createWarningsContainer(warnings) {
        return this.createElement("div", "lebab-warnings-container",
            [this.createCloseButton()].concat(
                warnings.map(this.offsetLine, this).map(this.createWarning, this)
            )
        );
    }

    createCloseButton() {
        const link = this.createElement("a", "icon icon-x lebab-warnings-close");
        link.onclick = () => {
            this.hideWarnings();
        };
        return link;
    }

    createWarning({line, msg, type}) {
        return this.createElement("p", "lebab-warning", [
            this.createElement("span", "inline-block highlight", "Lebab"),
            this.createElement("span", "inline-block highlight-warning", "Warning"),
            this.createElement("span", "inline-block highlight", type),
            this.createElement("span", "lebab-warning__msg", msg),
            this.createLineNrLink(line),
        ]);
    }

    createLineNrLink(line) {
        const link = this.createElement("a", "lebab-warning__line", `at line ${line}`)
        link.onclick = () => {
            this.editor.setCursorBufferPosition(new Point(line - 1, 0));
        };
        return link;
    }

    createElement(nodeType, className, children) {
        const el = document.createElement(nodeType);
        el.className = className;
        if (typeof children === "string") {
            el.appendChild(document.createTextNode(children))
        }
        else if (Array.isArray(children)) {
            children.forEach(child => el.appendChild(child));
        }
        return el;
    }

    offsetLine({line, msg, type}) {
        return {line: this.getStartLine() + line, msg, type};
    }

    getStartLine(line) {
        return this.isSelected() ? this.editor.getSelectedBufferRange().start.row : 0;
    }
}
