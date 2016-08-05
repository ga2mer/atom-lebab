"use babel";
import Converter from './Converter';

export {default as config} from './config';

export function activate() {
    // Command for applying all enabled transforms
    atom.commands.add(
        "atom-workspace",
        "atom-lebab:convert",
        () => convert(getEnabledTransforms())
    );

    // Commands for applying each transform separately
    getAllTransforms().forEach(transform => {
        atom.commands.add(
            "atom-workspace",
            `atom-lebab:convert-${transform}`,
            () => convert([transform])
        );
    });
}

function convert(transforms) {
    new Converter().convert(transforms);
}

function getEnabledTransforms() {
    return getTransformConfigs()
        .filter(([name, enabled]) => enabled)
        .map(([name]) => name);
}

function getAllTransforms() {
    return getTransformConfigs().map(([name]) => name);
}

function getTransformConfigs() {
    return Object.entries(atom.config.get('atom-lebab.transforms'));
}
