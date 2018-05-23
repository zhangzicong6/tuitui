var fs = require('fs')
    , gm = require('gm');
var request = require('request');
var exec = require('child_process').exec;
process.env.PATH += ":/usr/local/GraphicsMagick-1.3.28/bin";

function test() {
    var resize_cmd = 'gm "convert" "' + __dirname +  '/user_image/15270471516785199.jpg " "-resize" "360x" "' + __dirname + '/user_image/small_15270471516785199.jpg"';
    exec(resize_cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(error,'------------error1');
        }
        var mosaic_cmd = 'gm "convert" "-page" "+0+0" "' + __dirname + '/user_image/tmp_bg.jpg" "-page" "+766+1501" "' + __dirname + '/user_image/small_15270471516785199.jpg" "-page" "+566+1501" "http://thirdwx.qlogo.cn/mmopen/GmdicCmjHhibrs6X2mQb81vFCuxddMSN0JONOLKyK7PyBWjN9gFn7pnBQONHou1h3tZgUqia4uro4k9cVIHONmAHkrUW85X6RlI/132" "-mosaic" "' + __dirname + '/user_image/final.jpg"'

        exec(mosaic_cmd, function (error, stdout, stderr) {
            if (error) {
                console.log(error,'------------error2');
            }
        });
    });
}
test()

module.exports.test = test

