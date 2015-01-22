var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['D']);
var querystring = require('querystring');
var http = require('http');

ambient.on('ready', function () {
  // Get points of light and sound data.
  setInterval( function () {
    ambient.getSoundLevel( function(err, sdata) {
      if (err) throw err;
      console.log("Sound Level:", sdata.toFixed(8));

      var post_data = querystring.stringify({
        'level' : sdata.toFixed(8)
      });

      console.log(post_data);

      //   url: "https://hooks.slack.com/services/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",
      var options = {
        hostname: 'Jadam.local',
        port: 3012,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
        }
      };

      console.log('=> %s', curl.cmd(options));

      var req = http.request(options, function(res) {
        console.log(res);
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });

      req.write(post_data);
      req.end();
    });
  }, 2000); // The readings will happen every .5 seconds unless the trigger is hit

  // Set a sound level trigger
  // The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.1);

  ambient.on('sound-trigger', function(data) {
    //run POST
    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () {
      ambient.setSoundTrigger(0.1);
    },1500);
  });
});

ambient.on('error', function (err) {
  console.log(err)
});
