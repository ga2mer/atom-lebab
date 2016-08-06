"use babel";
import {Point} from 'atom';

export default class WarningsPanel {
    constructor(editor) {
        this.editor = editor;
    }

    show(warnings) {
        // Close warnings panel, if open from previous time
        if (WarningsPanel.panel) {
            this.hide();
        }

        if (warnings.length === 0) {
            return;
        }

        // Store the panel in static property,
        // so it will live through different WarningsPanel instances
        WarningsPanel.panel = atom.workspace.addBottomPanel({
            item: this.createWarningsContainer(warnings)
        });
    }

    hide() {
        WarningsPanel.panel.destroy();
        WarningsPanel.panel = undefined;
    }

    createWarningsContainer(warnings) {
        return this.createElement("div", "lebab-warnings-container",
            [this.createCloseButton()].concat(
                warnings.map(this.createWarning, this)
            )
        );
    }

    createCloseButton() {
        const link = this.createElement("a", "icon icon-x lebab-warnings-close");
        link.onclick = () => {
            this.hide();
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
}
