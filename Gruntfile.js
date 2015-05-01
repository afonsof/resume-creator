module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ejs: {
            test: {
                src: 'templates/resume.ejs',
                options: require('./data/resume.json'),
                dest: 'prototype-dist/resume.html'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'templates/', src: ['**'], dest: 'prototype-dist/'}
                ]
            }
        },
        clean: {
            main: ["prototype-dist/*.ejs", "prototype-dist/*.scss"]
        },
        sass: {
            prototype: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'prototype-dist/resume.css': 'templates/resume.scss'
                }
            },
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'site/css/resume.css': 'templates/resume.scss'
                }
            }
        }
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['ejs', 'sass:prototype', 'copy', 'clean']);

};
