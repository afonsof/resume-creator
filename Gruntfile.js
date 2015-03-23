module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ejs: {
            test: {
                src: 'templates/resume.ejs',
                options: require('./data/resume.json'),
                dest: 'dist/resume.html'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'templates/', src: ['**'], dest: 'dist/'}
                ]
            }
        },
        clean: {
            main: ["dist/*.ejs", "dist/*.scss"]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'dist/resume.css': 'templates/resume.scss'
                }
            }
        }
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['ejs', 'sass', 'copy', 'clean']);

};
