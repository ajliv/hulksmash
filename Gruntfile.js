module.exports = function (grunt) {

    require('time-grunt')(grunt); // Displays the elapsed execution time of grunt tasks

    require('load-grunt-tasks')(grunt);

    var pkg = grunt.file.readJSON('package.json');

    var hulksmash = {
        input: '.input',
        output: '.output'
    };


    grunt.initConfig({
        pkg: pkg,
        hulksmash: hulksmash,


        clean: {
            options: {
                force: true
            },
            output: '<%= hulksmash.output %>'
        },


        watch: {
            input: {
                files: ['<%= hulksmash.input %>/{,**/}*.{png,jpg,jpeg}'],
                tasks: ['imagemin:input']
            },
        },


        imagemin: {
            input: {
                files: [{
                    src: '{,**/}*.{png,jpg,jpeg}',
                    dest: '<%= hulksmash.output %>',
                    expand: true,
                    cwd: '<%= hulksmash.input %>'
                }]
            }
        }


    });


    /* Tasks */
    grunt.registerTask('smash', ['imagemin']);

    grunt.registerTask('default', function () {
        var tasks = ['smash', 'watch'];

        if (grunt.option('clean')) {
            tasks.unshift('clean:output');
        }

        grunt.task.run(tasks);
    });

};