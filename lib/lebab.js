"use babel";
import Converter from './Converter';
import transforms from './transforms';
import config from './config';

export default {
    config,
    converterMap: new WeakMap(),

    activate() {
        // Command for applying all enabled transforms
        atom.commands.add(
            "atom-workspace",
            "lebab:convert",
            () => this.convert(transforms.getEnabled())
        );

        // Commands for applying each transform separately
        transforms.getAll().forEach(transform => {
            atom.commands.add(
                "atom-workspace",
                `lebab:convert-${transform}`,
                () => this.convert([transform])
            );
        });
    },

    convert(transforms) {
        this.getConverter().convert(transforms);
    },

    getConverter() {
        const editor = atom.workspace.getActiveTextEditor();
        if (!this.converterMap.get(editor)) {
            this.converterMap.set(editor, this.createConverter(editor));
        }
        return this.converterMap.get(editor);
    },

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
    },
}
