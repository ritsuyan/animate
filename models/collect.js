/**
 * Created by RitsuYan on 2016/5/1.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectSchema = new Schema({
   content: {type: String, required: true}
});

module.exports = mongoose.model('Collect', CommentSchema);

