var UserModel = require('../model/User.js');

UserModel.find({openid:'o1U2E1M8lUESRq3Sv2rJm0QCsl_o'},function (err,data) {
    console.log(data,'------------------------')
})
