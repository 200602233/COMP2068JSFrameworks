const mongoose = require('mongoose');
// Take the out of the box functionality from the plm package to extend the user model
const plmModule = require('passport-local-mongoose');
const plm = plmModule.default || plmModule;

// used code from lesson 8
var dataSchemaObj = {
    username: { type: String },
    email: {type: String},
    password: { type: String },
    // add fields to handle oauth authenticated users
    oauthId: { type: String }, // id value to identify this user in the third-party system
    oauthProvider: { type: String }, // what auth provider was used? Github, google, etc.
    created: { type: Date, default: Date.now }, // when was this user record created
}
var userSchema = new mongoose.Schema(dataSchemaObj);
userSchema.plugin(plm);
// export the enhanced model
module.exports = new mongoose.model('User', userSchema);