define(['HubLink', 'RIB', 'PropertiesPanel', 'Easy'], function(Hub, RIB, Ppanel, easy) {
  var actions = ["ACTION1", "ACTION2"];
  var inputs = [];
  var _objects = {};
  var {{ cookiecutter.block_shortname }} = {
    settings:{
      Custom: {}
    },
    dataFeed: {}
  };

  // TODO: Review if this is a trully unique instance?

  {{ cookiecutter.block_shortname }}.getActions = function() {
    return actions;
  };

  {{ cookiecutter.block_shortname }}.getInputs = function() {
    return inputs;
  };

  /**
   * Use this method to control the visibility of the DataFeed
   * By default it will show() the DataFeed, change it to true due to hide it. 
   */
  {{ cookiecutter.block_shortname }}.hideDataFeed = function() {
    return false;
  };

  /**
   * Triggered when added for the first time to the side bar.
   * This script should subscribe to all the events and broadcast
   * to all its copies the data.
   * NOTE: The call is bind to the block's instance, hence 'this'
   * does not refer to this module, for that use '{{ cookiecutter.block_shortname }}'
   */
  {{ cookiecutter.block_shortname }}.onLoad = function(){

  };

  /**
   * When hasMissingProperties returns <true>
   * the properties windown will be open automatically after clicking the 
   * canvas block
   */
  {{ cookiecutter.block_shortname }}.hasMissingProperties = function() {
    // Define a logic you want to return true and open the properties window
    return false;
  };


  /**
   * Allows blocks controllers to change the content
   * inside the Logic Maker container
   */
  {{ cookiecutter.block_shortname }}.lmContentOverride = function(){
    // Use this to inject your custom HTML into the Logic Maker screen.
    return "<div> {{ cookiecutter.block_shortname }} html </div>";
  };

  /**
   * Parent is asking me to execute my logic.
   * This block only initiate processing with
   * actions from the hardware.
   */
  {{ cookiecutter.block_shortname }}.onExecute = function() {


  };

  // TODO: Move this to the block controller
  function save() {

  }

  /**
   * Triggered when the user clicks on a block.
   * The interace builder is automatically opened.
   * Here we must load the elements.
   * NOTE: This is called with the scope set to the
   * Block object, to emailsess this modules properties
   * use {{ cookiecutter.block_shortname }} or this.controller
   */
  {{ cookiecutter.block_shortname }}.onClick = function(){

  };

  /**
   * Parent is send new data (using outputs).
   */
  {{ cookiecutter.block_shortname }}.onNewData = function() {};

  // Returns the current value of my inputs
  // {{ cookiecutter.block_shortname }}.onRead = function(){};

  // Optional event handlers
  {{ cookiecutter.block_shortname }}.onMouseOver = function(){
    // console.log("Mouse Over on ", myself.canvasIcon.id, evt);
  };

  /**
   * A copy has been dropped on the canvas.
   * I need to keep a copy of the processor to be triggered when
   * new data arrives.
   */
  {{ cookiecutter.block_shortname }}.onAddedtoCanvas = function(){};

  return {{ cookiecutter.block_shortname }};
});
