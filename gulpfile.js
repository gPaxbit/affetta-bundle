var gulp = require("gulp"),
    pug = require("gulp-pug"),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    debug = require('gulp-debug'),
    babel = require('gulp-babel'),
    sm = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var path = {
    src: {
        html: './dev/pug/*.pug',
        css: './dev/styl/main.styl',
        js: './dev/js/*.js',
    },
    dist: {
        html: './www/',
        css: './www/assets/css/',
        js: './www/assets/js/',
    }
}

var start_index = () => {
	console.log('Done')
}

gulp.task('babel', () =>
    gulp.src(path.src.js)
	    .pipe(sm.init())
	    .pipe(babel({
	    	presets: ['latest']
	    }))
	    .pipe(concat('main.js'))
	    .pipe(sm.write('.'))
	    .pipe(gulp.dest(path.dist.js))
);

gulp.task('stylus', () => 
	gulp.src(path.src.css)
	  .pipe(sm.init())
	  .pipe(stylus({
	      compress: true
	  }))
	  .pipe(sm.write('.'))
	  .pipe(gulp.dest(path.dist.css))
);

gulp.task('pug', () => 
	gulp.src(path.src.html)
	  .pipe(pug({
	  	pretty: true
	  }))
	  .pipe(gulp.dest(path.dist.html))
);

gulp.task('watch', () => {
		watch('./dev/pug/**/*', () => gulp.start('pug'));
		watch('./dev/styl/**/*', () => gulp.start('stylus'));
		watch('./dev/js/**/*', () => gulp.start('babel'));
	}
)

gulp.task('default', ['watch']);