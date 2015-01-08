var rickshaw = require('rickshaw');
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');


var ambient = `ambientlib`.use(tessel.port['D']);

ambient.on('ready', function () {
  // Get points of light and sound data.
  setInterval( function () {
    ambient.getSoundLevel( function(err, sdata) {
      if (err) throw err;
      console.log("Sound Level:", sdata.toFixed(8), "Time:", XXXXX);
    });
  }, 500); // The readings will happen every .5 seconds unless the trigger is hit

    // Set a sound level trigger
    // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
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

var graph = new Rickshaw.Graph( {
  element: document.querySelector('.noiseGraph'),
  series: [
{
  color: 'steelblue',
  data: [ { x: 0, y: 23}, { x: 1, y: 15 }, { x: 2, y: 79 } ]
}, {
  color: 'lightblue',
  data: [ { x: 0, y: 30}, { x: 1, y: 20 }, { x: 2, y: 64 } ]
}
]
} );

graph.render();
