"use babel";
import ConverterPool from './ConverterPool';
import transforms from './transforms';
import config from './config';

export default {
    config,

    activate() {
        this.converterPool = new ConverterPool();

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
        this.converterPool.getActive().convert(transforms);
    },
}
