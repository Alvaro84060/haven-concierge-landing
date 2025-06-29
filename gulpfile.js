const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const fileInclude = require('gulp-file-include');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// 🧹 Limpiar /docs
function cleanDocs() {
  console.log('🔹 Ejecutando cleanDocs...');
  return src('docs', { read: false, allowEmpty: true })
    .pipe(clean());
}

// 📄 HTML
function htmlDocs() {
  console.log('🔹 Ejecutando htmlDocs...');
  return src('src/pages/**/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('docs'));
}

// 🎨 SASS → CSS
function sassDocs() {
  console.log('🔹 Ejecutando sassDocs...');
  return src('src/styles/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob()) // glob para importar todos los .scss
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/css'));
}

// 🖼️ Imágenes
function imagesDocs() {
  console.log('🔹 Ejecutando imagesDocs...');
  return src('src/images/**/*')
    .pipe(newer('docs/images'))
    .pipe(imagemin())
    .pipe(dest('docs/images'));
}

// 📁 Archivos estáticos (fonts, favicon, etc.)
function filesDocs() {
  console.log('🔹 Ejecutando filesDocs...');
  return src('src/files/**/*')
    .pipe(dest('docs/files'));
}

// 📜 JS con Babel
function jsDocs() {
  console.log('🔹 Ejecutando jsDocs...');
  return src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('docs/js'));
}

// 🧪 Build para producción
exports.docs = series(
  cleanDocs,
  parallel(htmlDocs, sassDocs, imagesDocs, filesDocs, jsDocs)
);
