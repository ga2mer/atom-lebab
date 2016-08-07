"use babel";
import WarningsFormatter from "./WarningsFormatter";

export default class WarningsPanel {
    /**
     * Shows warnings in bottom panel
     * @param  {Object[]} warnings
     * @param  {Function} onClick Called with line number when warning clicked on.
     */
    show(warnings, onClick) {
        // Close the panel, if open from previous time
        if (this.panel) {
            this.hide();
        }

        if (warnings.length === 0) {
            return;
        }

        this.panel = atom.workspace.addBottomPanel({
            item: new WarningsFormatter().format(warnings, {
                onClick: onClick,
                onClose: () => this.hide(),
            })
        });
    }

    hide() {
        this.panel.destroy();
        this.panel = undefined;
    }
}
