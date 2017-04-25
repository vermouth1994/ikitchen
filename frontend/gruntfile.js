module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { //合并
      options: {
        separator: ''
      },
      style: {
        src: ['www/css/*.css'],
        dest: 'www/dest/style.css'
      },
      pagejs: {
        src: ['www/js/*.js'],
        dest: 'www/dest/pagejs.js'
      },
    },
   uglify: {   //压缩js文件
      options: {
        banner: '/!*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> *!/\n'
      },
      dist: {
        files: {
            'www/dest/pagejs.min.js': ['www/dest/pagejs.js']
        }
      }
    },
    cssmin: {  //压缩css文件
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'www/dest/<%= pkg.cssname %>.min.css': ['www/css/*.css']    // 合并并压缩 path/to 目录下(包含子目录)的所有css文件
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jshint');



  grunt.registerTask('default', ['concat', 'cssmin','uglify']);
}
