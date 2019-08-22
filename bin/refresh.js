const https = require('https');

function httpRequest(options, postData) {
    return new Promise(function(resolve, reject) {
        var req = https.get(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var responseData = [];
            res.on('data', (chunk) => {
                responseData.push(chunk);
            });
            res.on('end', () => {
                try {
                    responseData = JSON.parse(Buffer.concat(responseData).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(responseData);
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}
const apiHost = 'www.smugmug.com';
const apiKey = 'dX8SwSBpKnnxGZTfzDGGfsv54WhV6gP4';
const apiPath = '/api/v2';
// album images
// const endpoint = '/album/mSMndp!images';
// image sizedetails
const endpoint = '/image/jLD7553-0!sizedetails';
const options = {
    hostname: apiHost,
    path: `${apiPath}${endpoint}?APIKey=${apiKey}`,
    headers: {
        'Accept': 'application/json'
    }
};
/*
https.get(options, (resp) => {

    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(JSON.parse(data))
    });
}).on('error', (err) => {
    console.log(`Error: ${err.message}`);
});
*/
httpRequest(options).then( (data) => {
    // console.log(data);
    
    // process image
    // console.log(`Processing: ${JSON.stringify(data.Response)}`);
    var imageUrl = data.Response.ImageSizeDetails.ImageSizeLarge.Url;
    console.log(`Processing: ${imageUrl}`);

    /*
    // process all album images
    var images = data.Response.AlbumImage;
    images.forEach(function(image, index) {
        console.log(image);
        var fileName = image.FileName;
        var uri = image.Uris.Image.Uri;
        // console.log(`index: ${index}, uri: ${uri}, filename: ${fileName}`);
    });
    */
})
