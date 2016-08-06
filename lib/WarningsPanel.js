"use babel";

export default class WarningsPanel {
    /**
     * Shows warnings in bottom panel
     * @param  {Object[]} warnings
     * @param  {Function} onclick Called with line number when warning clicked on.
     */
    show(warnings, onclick) {
        this.onclick = onclick;

        // Close the panel, if open from previous time
        if (this.panel) {
            this.hide();
        }

        if (warnings.length === 0) {
            return;
        }

        this.panel = atom.workspace.addBottomPanel({
            item: this.createWarningsContainer(warnings)
        });
    }

    hide() {
        this.panel.destroy();
        this.panel = undefined;
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
        link.onclick = () => this.onclick(line);
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
