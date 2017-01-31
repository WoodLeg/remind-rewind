import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import util from 'gulp-util';
import using from 'gulp-using';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import rev from 'gulp-rev';
import minifyCss from 'gulp-minify-css';
import inject from 'gulp-inject';
import runSequence from 'run-sequence';
import del from 'del';


var PATHS = {
    SRC 	: {
        BASE 	: 'public/src',
        INDEX  	: 'public/src/index.html',
        APP 	: 'public/src/app.js',

        ASSETS 	: {
            BASE    : 'public/src/assets',
            STYLES  : 'public/src/assets/style',
            IMG     : 'public/src/assets/img',
            FONTS	: 'public/src/assets/fonts',
            I18N    : 'public/src/assets/i18n'
        }
    },

    DEST 	: {
        BASE 	: 'public/dist',

        ASSETS 	: {
            BASE 	: 'public/dist/assets',
            CSS   	: 'public/dist/assets/css',
            IMG   	: 'public/dist/assets/img',
            FONTS 	: 'public/dist/assets/fonts',
            I18N    : 'public/dist/assets/i18n'
        },

        LIB  	: {
            BASE 	: 'public/dist/lib',
            JS    	: 'public/dist/lib/js',
            CSS   	: 'public/dist/lib/css',
            FONTS 	: 'public/dist/lib/fonts'
        }
    },
};

watchify.args.debug = true;

const sync = browserSync.create();

// Input file.
watchify.args.debug = true;
var bundler = browserify(PATHS.SRC.BASE + '/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: PATHS.SRC.BASE
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
    .on('error', function(error){
        console.error( '\nError: ', error.message, '\n');
        this.emit('end');
    })
    .pipe(exorcist(PATHS.DEST.LIB.JS + '/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest(PATHS.DEST.LIB.JS));
}

// Project pictures
gulp.task('app-images', function() {
    return gulp.src(PATHS.SRC.ASSETS.IMG + '/**')
        .pipe(gulpif(util.env.debug, using()))
        .pipe(gulp.dest(PATHS.DEST.ASSETS.IMG));
});

// Project style
gulp.task('app-style', function() {
    return gulp.src([
        PATHS.SRC.BASE + '/app.scss',
        PATHS.SRC.BASE + 'components/**/*.scss',
        PATHS.SRC.BASE + 'common/**/*.scss'
    ])
    .pipe(sass({
        includePaths: [
            'public/bower_components/bootstrap-sass/assets/stylesheets',
            PATHS.SRC.BASE + '/components/**/*',
            PATHS.SRC.BASE + '/common/**/*'
        ]
    })
    .on('error', sass.logError))
    .pipe(gulpif(util.env.debug,using()))
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(gulpif(util.env.optimize,rev()))
    .pipe(gulpif(util.env.optimize,minifyCss()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.DEST.LIB.CSS));
});

gulp.task('inject', function() {
    return gulp.src(PATHS.SRC.INDEX)
    .pipe(inject(
        gulp.src([
            PATHS.DEST.LIB.JS + '/**/*.js',
            PATHS.DEST.BASE + '/**/*.css',
            PATHS.DEST.BASE + '/**/*.js'
        ], {read : false}),
        {
            addRootSlash    : false,
            ignorePath      : PATHS.DEST.BASE
        }
    ))
    .pipe(gulp.dest(PATHS.DEST.BASE));
});

// Clean project
gulp.task('clean', function() {
    return del(PATHS.DEST.BASE + '/**/*');
});

// Copy index.html to /dist
gulp.task('index',function(){
    return gulp
        .src(PATHS.SRC.BASE + '/index.html')
        .pipe(gulp.dest(PATHS.DEST.BASE));
});

gulp.task('default', ['transpile']);

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
    return gulp.src([PATHS.SRC.BASE + '/**/*.js', 'gulpfile.babel.js'])
      .pipe(eslint())
      .pipe(eslint.format())
});

gulp.task('build', (cb) => {
    return runSequence ('clean', ['index', 'app-style', 'app-images', 'lint', 'transpile'], 'inject', cb);
});

gulp.task('serve', ['watch'], () => sync.init({
    server: PATHS.DEST.BASE,
    port: process.env.PORT || 8000,
    host: process.env.IP || 'localhost'
}));

gulp.task('style-watch', ['app-style'], () => sync.reload());

gulp.task('js-watch', ['transpile'], () => sync.reload());

gulp.task('watch', ['build'], () => {
    gulp.watch(PATHS.SRC.BASE + '/**/*.scss', ['style-watch']);
    gulp.watch(PATHS.SRC.BASE +'/**/*.js', ['js-watch']);
    gulp.watch(PATHS.SRC.INDEX, sync.reload);
});
