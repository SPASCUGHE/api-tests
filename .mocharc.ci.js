module.exports = {
 spec: ['src/test/**/*.ts'],
 package: './package.json',
 extension: ['.ts'],
 timeout: 10 * 1000,
 color: true,
 grep: '',
 ignore: [''],
 reporter: 'mocha-multi-reporters',
 'reporter-option': ['configFile=.mocha-reporters.json'],
 require: ['ts-node/register, tsconfig-paths/register'],
 parallel: false,
 recursive: false,
 retries: 1,
 slow: '75',
 sort: false,
 ui: 'bdd'
};
