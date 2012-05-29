// subcommand.js
exports.COA = function() {
    this
        .title('Awesome subcommand').helpful()
        .opt()
            .name('output').title('output file')
            .short('o').long('output')
            .output() // use default preset for "output" option declaration
            .end()
};