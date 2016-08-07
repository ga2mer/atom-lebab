"use babel";
import WarningsFormatter from "./WarningsFormatter";

export default class WarningsPanel {
    /**
     * Shows warnings in bottom panel
     * @param  {Object[]} warnings
     * @param  {Function} onClick Called with line number when warning clicked on.
     */
    render(warnings, onClick) {
        // Close the panel, if open from previous time
        this.destroy();

        if (warnings.length === 0) {
            return;
        }

        this.panel = atom.workspace.addBottomPanel({
            item: new WarningsFormatter().format(warnings, {
                onClick: onClick,
                onClose: () => this.destroy(),
            })
        });
    }

    /**
     * Destroys the warnings panel (if it exists)
     */
    destroy() {
        if (this.panel) {
            this.panel.destroy();
            this.panel = undefined;
        }
    }

    /**
     * Shows the warnings panel (if it exists)
     */
    show() {
        if (this.panel) {
            this.panel.show();
        }
    }

    /**
     * Hides the warnings panel (if it exists)
     */
    hide() {
        if (this.panel) {
            this.panel.hide();
        }
    }
}
