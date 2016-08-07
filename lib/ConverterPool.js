"use babel";
import Converter from './Converter';

export default class ConverterPool {
    constructor() {
        // Use WeakMap to ensure we Converters get garbage-collected
        // when the associated editor is removed.
        this.map = new WeakMap();
    }

    /**
     * Returns Converter instance for active editor.
     * @return {Converter}
     */
    getActive() {
        const editor = atom.workspace.getActiveTextEditor();
        if (!this.map.get(editor)) {
            this.map.set(editor, this.createConverter(editor));
        }
        return this.map.get(editor);
    }

    createConverter(editor) {
        const converter = new Converter(editor);

        // Show/Hide warnings panel when active editor changes
        const listener = atom.workspace.onDidStopChangingActivePaneItem(() => {
            if (atom.workspace.getActiveTextEditor() === editor) {
               converter.getWarningsPanel().show();
            }
            else {
               converter.getWarningsPanel().hide();
            }
        });

        // When editor is closed, eliminate warnings panel
        editor.onDidDestroy(() => {
            converter.getWarningsPanel().destroy();
            listener.dispose();
        });

        return converter;
    }
}
