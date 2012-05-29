require('coa').Cmd() // main (top level) command declaration
    .name(process.argv[1]) // set top level command name from program name
    .title('My awesome command line util') // title for use in text messages
    .helpful() // make command "helpful", i.e. options -h --help with usage message
    .opt() // add some option
        .name('version') // name for use in API
        .title('Version') // title for use in text messages
        .short('v') // short key: -v
        .long('version') // long key: --version
        .flag() // for options without value
        .act(function(opts) { // add action for option
            // return message as result of action
            var json = require('fs').readFileSync('./package.json'),
                version = JSON.parse(json).version + '\n',
                name = JSON.parse(json).name + ' ',
                description = JSON.parse(json).description,
                result = name + version + description;
            return result;
        })
        .end() // end option chain and return to main command
    .cmd().name('subcommand').apply(require('./commands/subcommand').COA).end() // load subcommand from module
    .cmd() // inplace subcommand declaration
        .name('othercommand').title('Awesome other subcommand').helpful()
        .opt()
            .name('input').title('input file, required')
            .short('i').long('input')
            .val(function(v) { // validator function, also for translate simple values
                return require('fs').createReadStream(v) })
            .req() // make option required
            .end() // end option chain and return to command
        .end() // end subcommand chain and return to parent command
    .run(process.argv.slice(2)); // parse and run on process.argv