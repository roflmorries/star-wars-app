const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');


const scss = gulpSass(sass);

const BUILD_FOLDER = "./dist/";
const SRC_FOLDER = "./src/*.js";
const SASS_SRC_FOLDER = "./src/scss/*.scss";
const HTML_SRC_FOLDER = './src/index.html';
const IMG_SRC_FOLDER = './src/images/*'

gulp.task("default", gulp.series(clean, gulp.parallel(js, sassCompile, images, html), watcher));

gulp.task('sass-compile', gulp.series(sassCompile, watcher))

async function clean() {
    const { deleteAsync } = await import('del');
    return deleteAsync([BUILD_FOLDER]);
}


async function sassCompile() {
    gulp.src(SASS_SRC_FOLDER)
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`${BUILD_FOLDER}css/`))
}

async function watcher() {
    gulp.watch(SRC_FOLDER, js);
    gulp.watch(SASS_SRC_FOLDER, sassCompile)
    gulp.watch(IMG_SRC_FOLDER, images)
    gulp.watch(HTML_SRC_FOLDER, html)
}

async function js() {
    gulp.src(SRC_FOLDER)
      .pipe(babel())
      .pipe(minify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(`${BUILD_FOLDER}js/`));
}

async function html() {
    gulp.src(HTML_SRC_FOLDER)
        .pipe(gulp.dest(BUILD_FOLDER))
}

async function images() {
    const imagemin = (await import('gulp-imagemin')).default;
    gulp.src(IMG_SRC_FOLDER)
        .pipe(imagemin([]))
        .pipe(gulp.dest(`${BUILD_FOLDER}images/`))
}