module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	
	coffee: {
	
	  compileJoined: {
	    options: {
	      join: true
	    },
	    files: {	    	
	    	'js-final/autolightbox.js': [
	    		'src/check.coffee',
	    		'src/icons.coffee',
	    		'src/styles.coffee',
	    		'src/Classes-Metodos.coffee',
	    		'src/Lightbox.coffee'
	    	]
	    }
	  }	  
	},
	uglify: {
		options: {
	      compress: true
	    },
		my_target: {
		  files: {
		    'js-final/autolightbox.min.js': ['js-final/autolightbox.js']
		  }
		}
	},
    watch: {
	    scripts: {
		    files: ['src/*.coffee'],
		    tasks: ['coffee', 'uglify'],
		    options: {
		    spawn: false,
	  	},
	  },
	}
  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define your tasks here
  grunt.registerTask('default', ['coffee', 'uglify', 'watch']);
};