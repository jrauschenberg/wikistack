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
  status: { type: String, enum: ['open', 'closed'] },
  tags: [String]
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

pageSchema.pre('validate', function generateUrlTitle (next) {
  if (this.title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    this.urlTitle = this.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    this.urlTitle = Math.random().toString(36).substring(2, 7);
  }
  next();
});

pageSchema.virtual('route').get(function() {
  return '/wiki/' + this.urlTitle;
});

pageSchema.statics.findByTag = function(tag) {
  return this.find({tags: {$elemMatch: {$eq: tag}}});
 };

 pageSchema.methods.findSimilar = function() {

  return Page.find({
    tags: {
      $in: this.tags
    },
    _id: {
      $ne: this._id
    }
  }).exec();

 };

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};

