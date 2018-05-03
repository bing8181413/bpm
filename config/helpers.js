var path = require('path');
var glob = require('glob');
var helpers = {
    getEntry: function (globPath, replaceDir, exclude) {
        var files = glob.sync(globPath); 
        var entries = {};
        var entryname, filepath, dirname, extname, basename;
        for (var i = 0; i < files.length; i++) {
            filepath = files[i];
            dirname = path.dirname(filepath); 
            extname = path.extname(filepath);
            basename = path.basename(filepath, extname);
            entryname = basename;
            if (entryname.startsWith(replaceDir)) {
                entryname = entryname.substring(replaceDir.length)
            }
            if (replaceDir) {
                entryname = replaceDir;
                if (!entries[entryname]) {
                    entries[entryname] = [];
                }
                entries[entryname].push(filepath);
                continue;
            }
            if (exclude && exclude.indexOf(entryname) > -1) {
                continue;
            }
            entries[entryname] = filepath;
        }
        return entries;
    }
}
module.exports = helpers;