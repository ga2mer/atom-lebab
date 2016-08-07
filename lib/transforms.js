"use babel";

export default {
    /**
     * Get list of all transforms enabled in settings.
     * @return {String[]}
     */
    getEnabled() {
        return this.getConfigs()
            .filter(([name, enabled]) => enabled)
            .map(([name]) => name);
    },

    /**
     * Get list of all availeble transforms.
     * @return {String[]}
     */
    getAll() {
        return this.getConfigs().map(([name]) => name);
    },

    getConfigs() {
        return Object.entries(atom.config.get('lebab.transforms'));
    },
}
