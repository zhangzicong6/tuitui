var fs = require('fs')
    , gm = require('gm');
var request = require('request');
var exec = require('child_process').exec;
process.env.PATH += ":/usr/local/GraphicsMagick-1.3.28/bin";

function test() {
    var resize_cmd = 'gm "convert" "' + __dirname +  '/user_image/15270569225682899.jpg" "-resize" "360x" "' + __dirname + '/user_image/small_15270569225682899.jpg.jpg"';
    exec(resize_cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(error,'------------error1');
        }
        var mosaic_cmd = 'gm "convert" "-page" "+0+0" "' + __dirname + '/user_image/tmp_bg.jpg" "-page" "+766+1501" "' + __dirname + '/user_image/small_15270569225682899.jpg" "-page" "+566+1501" "' + __dirname + 'head_15270569225682899.jpg" "-mosaic" "' + __dirname + '/user_image/final.jpg"'

        exec(mosaic_cmd, function (error, stdout, stderr) {
            if (error) {
                console.log(error,'------------error2');
            }
        });
    });
}
test()

module.exports.test = test
