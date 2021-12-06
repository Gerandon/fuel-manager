const replace = require('replace-in-file');
const buildVersion = process.argv[2];
const options = {
    files: 'src/environments/environment.prod.ts',
    from: /{BUILD_TIMESTAMP}/g,
    to: new Date(),
    allowEmptyPaths: false,
};

try {
    replace.sync(options);
    console.log('Replaces synced');
}
catch (error) {
    console.error('Replace sync error:', error);
}
