const gulp = require("gulp");
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const csscomb = require('gulp-csscomb');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const watchify = require('watchify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const _ = require('lodash');

const port = 4000;

const src = "src/";
const dist = "./";
const asset = "";
const spec = "spec/";
const txt = "txt/";

const s = {
    root : src,
    html : src + "html/",
    css  : src + "css/",
    js   : src + "js/",
    img  : src + "img/",
    fonts: [
        "./node_modules/font-awesome/fonts/"
    ]
};

const d = {
    root : dist,
    html : dist,
    css  : dist + asset,
    js   : dist + asset + "js/",
    lib  : dist + asset + "libs/",
    img  : dist + asset + "img/",
    fonts: dist + asset + "fonts/"
};


// build css
gulp.task("css", ()=>{
    gulp.src(`${s.css}style.scss`)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 10'],
            cascade : false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(d.css))
        .pipe(connect.reload());
});


// add custom browserify options here
customOpts = {
    entries: [`${s.js}main.js`],
    //debug: true
    debug  : false
};

const opts = _.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts)).transform(babelify, { presets: ['es2015'] });

// add transformations here
// i.e. b.transform(coffeeify);

const bundle = () =>{
    b.bundle()
     // log errors if they happen
     .on('error', gutil.log.bind(gutil, 'Browserify Error'))

     .pipe(source('app.js'))
     // optional, remove if you don't need to buffer file contents
     .pipe(buffer())
     // optional, remove if you dont want sourcemaps
     // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
     // Add transformation tasks to the pipeline here.
     // .pipe(sourcemaps.write('../maps/')) // writes .map file
     .pipe(gulp.dest(d.js))
     .pipe(connect.reload());

    gulp.start("imgs");
};


gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal


// copy imgs
gulp.task("imgs", ()=>{
    return gulp.src(s.img + "**/*.*")
               .pipe(gulp.dest(d.img));
});

// copy fonts
gulp.task("fonts", ()=>{
    return gulp.src(s.fonts + "**/*.*")
               .pipe(gulp.dest(d.fonts));
});


// copy files
gulp.task("copy", ()=>{
    return gulp.start("fonts", "imgs");
});


// watch
gulp.task('watch', () =>{
    watch([`${s.css}**/*.s*ss`], () =>{
        return gulp.start(['css', 'imgs']);
    });
    return watch([`${s.js}**/*.js`], () =>{
        return gulp.start(['js', 'imgs']);
    });
});

// build
gulp.task("build", ()=>{
    return gulp.start("css", "js", "imgs");
});


// default
gulp.task("default", ()=>{
    return gulp.start("watch");
});


