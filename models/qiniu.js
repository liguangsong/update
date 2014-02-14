var qiniu = require('node-qiniu');

fs = require('node-fs');

qiniu.config({
    access_key: '0qdQkJdpfpqNu59_4Ytq7UnvWlx-SOZ5TobYYAwi',
    secret_key: 'j2v3HB_P6N5ncQHzvWnFyWfTXbjP76IEew9k8O3S'
});

var imagesBucket = qiniu.bucket('fristtry');
var __dirname = '/home/lg/haha/update/materials/'

function Filer(filer) {
    this.name = filer.name.toString();
    this.format = filer.format.toString();
};

module.exports = Filer;

Filer.prototype.save = function (callback) {

    imagesBucket.putFile(this.name, __dirname + this.name + "." + this.format)
        .then(
        function (reply) {
            console.dir(reply);
            callback(err)
        },
        function (err) {
            console.error(err);
            callback(err)
        }
    );
}

Filer.prototype.update = function (callback) {
    var name = this.name;
    var format = this.format;
    imagesBucket.key(this.name).remove(function (err) {
        if (err) {
            return callback(err);
        }
        imagesBucket.putFile(name, __dirname + name + "." + format)
            .then(
            function (reply) {
                console.dir(reply);
                callback(err)
            },
            function (err) {
                console.error(err);
                callback(err)
            }
        );
    });
}

Filer.prototype.get = function (callback) {
    var gettingStream = imagesBucket.createGetStream(this.name);
    var writingStream = fs.createWriteStream(__dirname + this.name + "." + this.format);
    gettingStream.pipe(writingStream)
        .on('error', function (err) {
            callback(err)
        })
        .on('finish', function (err) {
            callback(err)
        });

}

Filer.prototype.remove = function (callback) {
    imagesBucket.key(this.name).remove(function (err) {
        callback(err);
    });
}