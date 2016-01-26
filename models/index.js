var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: { type: String, required: true },
  urlTitle: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'] }
});

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

pageSchema.virtual('route').get(function() {
  return '/wiki/' + this.urlTitle;
});

module.exports = {
  Page: Page,
  User: User
};

