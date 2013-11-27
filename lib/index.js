var tpl2amd = function(args, config, logger/*, helper*/) {
    config = config || {};

    var log = logger.create('preprocessor.furnace');
    //var defaultOptions = {};
    //var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

    var transformPath = args.transformPath || config.transformPath || function(filepath) {
        return filepath.replace(/\.tpl/, '.js');
    };

    return function(content, file, done) {
        var result = null;

        log.debug('Processing "%s".', file.originalPath);
        file.path = transformPath(file.originalPath);

        try {
            var json = {
                'template': content 
            };
            var INDENT = '    ';
            result = 'define([], function(){\n\n' 
                + INDENT + 'return ' 
                + JSON.stringify(json)
                + '; \n\n});';
        } catch (e) {
            log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line);
            return;
        }

        done(result);
    };
};

tpl2amd.$inject = ['args', 'config.furnace', 'logger', 'helper'];

module.exports = {
    'preprocessor:furnace[tpl>amd]': ['factory', tpl2amd]
};
