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
	    	'js/lightbox.js': [
	    		'src/check.coffee',
	    		'src/icons.coffee',
	    		'src/Classes-Metodos.coffee',
	    		'src/Lightbox.coffee'
	    	]
	    }
	  }	  
	},
    watch: {
	    scripts: {
		    files: ['src/*.coffee'],
		    tasks: ['coffee'],
		    options: {
		    spawn: false,
	  	},
	  },
	}
  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define your tasks here
  grunt.registerTask('default', ['coffee', 'watch']);
};