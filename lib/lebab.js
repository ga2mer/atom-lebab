"use babel";
import Converter from './Converter';
import transforms from './transforms';

export {default as config} from './config';

export function activate() {
    // Command for applying all enabled transforms
    atom.commands.add(
        "atom-workspace",
        "lebab:convert",
        () => convert(transforms.getEnabled())
    );

    // Commands for applying each transform separately
    transforms.getAll().forEach(transform => {
        atom.commands.add(
            "atom-workspace",
            `lebab:convert-${transform}`,
            () => convert([transform])
        );
    });
}

function convert(transforms) {
    new Converter().convert(transforms);
}
