var gulp  = require("gulp")
var less = require("gulp-less")
var autoprefixer = require("gulp-autoprefixer")
var clearCss = require("gulp-clean-css")

gulp.task("default",["less"],() =>{
    console.log("task gulp")
})
gulp.task("less",()=>{
    gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest("build"))
        .pipe(autoprefixer({
            browsers:["last 5  versions","firefox > 20"],
            cascade:false
        }))
        .pipe(clearCss())
        .pipe(gulp.dest("build"))
})
gulp.task("watch",() =>{
    var watch = gulp.watch("./src/**/*",["default"])
    watch.on("change",(event)=>{
        console.log("File "+event.path +"was "+event.type + ",running tasks...")
    })
})