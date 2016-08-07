"use babel";

export default class {
    /**
     * Renders warnings in HTML
     * @param  {Object[]} warnings
     * @param  {Object} events Event handlers:
     * @param  {Function} events.onClick Called with line number when warning clicked on.
     * @param  {Function} events.onClose Called when close button is clicked.
     * @return {HTMLElement}
     */
    format(warnings, events) {
        this.events = events;

        return this.createElement("div", "lebab-warnings-container",
            [this.createCloseButton()].concat(
                warnings.map(this.createWarning, this)
            )
        );
    }

    createCloseButton() {
        const link = this.createElement("a", "icon icon-x lebab-warnings-close");
        link.onclick = this.events.onClose;
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
        link.onclick = () => this.events.onClick(line);
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
