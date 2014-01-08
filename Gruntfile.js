'use strict';
 
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'js/nu-pogodi/nu-pogodi.min.js': [
                        'js/nu-pogodi/*.js',
                        'js/nu-pogodi/model/*.js',
                        'js/nu-pogodi/states/*.js',
                        'js/nu-pogodi/utils/*.js'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
};


