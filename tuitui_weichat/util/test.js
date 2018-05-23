var fs = require('fs')
    , gm = require('gm');
var request = require('request');
var exec = require('child_process').exec;
process.env.PATH += ":/usr/local/GraphicsMagick-1.3.28/bin";

function test() {
    var resize_cmd = 'gm "convert" "' + __dirname +  '/user_image/15270471516785199.jpg " "-resize" "264x" "' + __dirname + '/user_image/small_15270471516785199.jpg"';
    exec(resize_cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
        }
        var mosaic_cmd = 'gm "convert" "-page" "+0+0" "' + __dirname + '/user_image/tmp_bg.jpg" "-page" "+894+1619" "' + __dirname + '/user_image/small_15270471516785199.jpg" "-mosaic" "' + __dirname + '/user_image/final.jpg"'

        exec(mosaic_cmd, function (error, stdout, stderr) {
            if (error) {
                console.log(error);
            }
        });
    });
}
test()

module.exports.test = test

