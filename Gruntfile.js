module.exports=function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        //grunt中的任务名与配置属性名保持一致
        //grunt中的任务名应该都是确定的，即grunt自带的
        concat:{
            //任务级选项,对任务的默认值进行覆盖
            options:{
                //每个任务的选项也应该都是grunt自带的
                separator:";"
            },
            //任务目标，应该也是grunt自带的命名
            dist:{
                options:{
                    separator:"\n"
                },
                files:[
                    {
                        src:["resoureces/css/bootstrap.min.css","resoureces/css/ripples.min.css","resoureces/css/material-wfont.min.css","resoureces/css/Rainbow.css"],
                        dest:"dist/resoureces/css/aliyun-zh.css"
                    },
                    {
                        src:["resoureces/css/bootstrap.min.css","sub/success.css"],
                        dest:"dist/sub/success.css"
                    },
                    {
                        src:["resoureces/css/bootstrap.min.css","sub/wifi.css"],
                        dest:"dist/sub/wifi.css"
                    },
                    {
                        src:["resoureces/css/bootstrap.min.css","sub/wechat.css"],
                        dest:"dist/sub/wechat.css"
                    }
                ]
            },
            foo:{
                //待拼接文件
                src:["js/jquery-1.11.1.min.js","js/Rainbow.js","js/cloud.js","resoureces/js/bootstrap.min.js","resoureces/js/ripples.min.js","resoureces/js/material.min.js"],
                //生成的文件位置
                dest:"dist/js/aliyun-zh.js"
            }
        },
        uglify:{
            //任务级选项，对任务的默认值进行覆盖
            options:{
                //生成注释并插入到输出文件的顶部
                banner:"/*<%= pkg.name%><%= grunt.template.today('dd-mm-yyyy')%>*/\n"
            },
            //由此看来，除了任务名是固定的以外，任务具有的目标也是固定的
            dist:{
                files:{
                    //这里两个任务concat和uglify协同工作了
                    "dist/js/aliyun-zh.min.js":["<%= concat.foo.dest%>"]
                }
            }
        },
        cssmin:{
            dist:{
                files:[{
                    src:["<%= concat.dist.files[0].dest%>"],
                    dest:"dist/resoureces/css/aliyun-zh.min.css"
                },{
                    src:["<%= concat.dist.files[1].dest%>"],
                    dest:"dist/sub/success.min.css"
                },{
                    src:["<%= concat.dist.files[2].dest%>"],
                    dest:"dist/sub/wifi.min.css"
                },{
                    src:["<%= concat.dist.files[3].dest%>"],
                    dest:"dist/sub/wechat.min.css"
                }]
            }
        },
        jshint: {
            files: ['js/test.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                "undef": true,
                "unused": true
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("test",["jshint"]);
    grunt.registerTask("cu",["concat","uglify","cssmin"]);
}