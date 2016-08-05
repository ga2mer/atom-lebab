"use babel";
import Converter from './Converter';

export {default as config} from './config';

export function activate() {
    atom.commands.add("atom-workspace", "atom-lebab:convert", convert);
}

function convert() {
    new Converter().convert();
}
