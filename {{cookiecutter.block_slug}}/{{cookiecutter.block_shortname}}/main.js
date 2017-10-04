define(['HubLink', 'RIB', 'PropertiesPanel', 'Easy'], function(Hub, RIB, Ppanel, easy) {

{% if cookiecutter.block_category == 'Hardware' or cookiecutter.block_category == 'Virtual' %}
  var actions = ["ACTION1", "ACTION2"];
  var inputs = [];
  var _objects = {};

  var {{ cookiecutter.block_shortname }} = {
    settings:{
      Custom: {}
    },
    dataFeed: {}
  };

  // Use var for creating local fields:
  var localField1 = '';

  // Set if the blocks is Input and/or Output
  {{ cookiecutter.block_shortname }}.isInputBlock = true;
  {{ cookiecutter.block_shortname }}.isOutputBlock = true;

  // TODO: Review if this is a trully unique instance?

  {{ cookiecutter.block_shortname }}.getActions = function() {
    return actions;
  };

  {{ cookiecutter.block_shortname }}.getInputs = function() {
    return inputs;
  };

  /**
   * (OPTIONAL)
   * Called when no logic has been added in the Logic Maker.
   * Here you can define the default input to use to send
   * data to any child block connected to this block's canvas.
   * IMPORTANT: Output Blocks SHOULD NOT have this method
   */
  {{ cookiecutter.block_shortname }}.getDefaultInput = function() {
    return "";
  };

  /**
   * (OPTIONAL)
   * Called when no logic has been added in the Logic Maker.
   * Here you can define a default action for your block to 
   * execute when a signal is sent.
   * IMPORTANT: Input Blocks SHOULD NOT use this method
   */
  {{ cookiecutter.block_shortname }}.getDefaultAction = function() {
    // return actions[0];
  };

  /**
   * This method is called when the user hits the "Save"
   * recipe button. Any object you return will be stored
   * in the recipe and can be retrieved during startup (@onLoad) time.
   * Be aware that only primitive properties are stored
   * (Numbers, Strings)
   */
  {{ cookiecutter.block_shortname }}.onBeforeSave = function() {
    return { localField1: localField1 };
  };

  /**
   * Use this method to control the visibility of the DataFeed panel
   * By default the DataFeed is shown when the user clicks on the
   * canvas Icon. Return true to prevent the panel from showing.
   */
  {{ cookiecutter.block_shortname }}.hideDataFeed = function() {
    return false;
  };



  /**
   * When a canvas block is clicked on, this method is executed
   * to check if the properties panel needs to open automatically.
   * This is useful in those cases when users MUST define some
   * properties in order to make the block work.
   */
  {{ cookiecutter.block_shortname }}.hasMissingProperties = function() {
    // if (this.parameterFilledUp) {
    //   return false; // keep it closed
    // }

    // return true;    // will open the properties
  };

  /**
   * Intercepts the properties panel closing action.
   * Return "false" to abort the action.
   * NOTE: Settings Load/Saving will automatically
   * stop re-trying if the event propagates.
   */
  {{ cookiecutter.block_shortname }}.onCancelProperties = function() {
    console.log("Cancelling Properties");
  };


  /**
   * Intercepts the properties panel save action.
   * You must call the save method directly for the
   * new values to be sent to hardware blocks.
   * @param settings is an object with the values
   * of the elements rendered in the interface.
   * NOTE: For the settings object to contain anything
   * you MUST have rendered the panel using standard
   * ways (easy.showBaseSettings and easy.renderCustomSettings)
   */
  {{ cookiecutter.block_shortname }}.onSaveProperties = function(settings) {

    this.settings = settings;

  };


  /**
   * Triggered when added for the first time to the side bar.
   * This script should subscribe to all the events and broadcast
   * to all its copies the data.
   * NOTE: The call is bound to the block's instance, hence 'this'
   * does not refer to this module, for that use "this.controller"
   */
  {{ cookiecutter.block_shortname }}.onLoad = function() {
    var that = this;

    // Load previously stored settings
    if (this.storedSettings && this.storedSettings.localField1) {
      localField1 = this.storedSettings.localField1;
    }

    // Load any dependency
    var assets = that.basePath + 'js/';
    require([assets+'helper.js'], function(helper){
      console.log("Module loaded!");
      console.log(helper.addUp(1, 2));
    });

    // Load our properties template and keep it in memory
    this.loadTemplate('properties.html').then(function(template) {
      that.propTemplate = template;
    });
  };


  /**
   * Allows blocks controllers to change the content
   * inside the Logic Maker container
   */
  {{ cookiecutter.block_shortname }}.lmContentOverride = function() {
    // Use this to inject your custom HTML into the Logic Maker screen.
    return "";
  };

  /**
   * Parent is asking me to execute my logic.
   * This block only initiate processing with
   * actions from the hardware.
   */
  {{ cookiecutter.block_shortname }}.onExecute = function(event) {

  };


  /**
   * Triggered when the user clicks on a block.
   * The properties panel is opened automatically.
   * Here we must load the elements.
   * NOTE: This is called with the scope set to the
   * Block object, to refer to this module's properties
   * use {{ cookiecutter.block_shortname }} or this.controller
   */
  {{ cookiecutter.block_shortname }}.onClick = function() {
    var that = this;

    Ppanel.onClose(function(){
      that.cancelLoading();
      that.cancelSaving();
      Ppanel.stopLoading();
    });

    Ppanel.loading("Loading settings...");

    // Render the template
    var html = $(that.propTemplate({
      localField1: localField1,
    }));

    this._propContainer = html;

    // Display elements
    easy.displayCustomSettings(html, true);

    Ppanel.stopLoading();

  };

  /**
   * Parent is send new data (using outputs).
   */
  {{ cookiecutter.block_shortname }}.onNewData = function() {

  };

  // Optional event handlers
  {{ cookiecutter.block_shortname }}.onMouseOver = function() {
    // console.log("Mouse Over on ", this.canvasIcon.id, evt);
  };

  {{ cookiecutter.block_shortname }}.onMouseOut = function() {
    // console.log("Mouse out!");
  };

  /**
   * Blocks have the ability to be replaced by other blocks
   * by dragging and dropping a block from the left panel
   * onto the canvas instance. This is useful when for example
   * you move a hardware block to a different radio. Since
   * once powered up again, it will appear as a different block
   * (because it now belongs to a different node), rather than
   * adding the new block to the canvas and copy the logic from 
   * the offline one, you can just drag and drop the new
   * block onto the offline instance in your canvas; this will
   * associate the offline block with the online instance, hence
   * making it appear online again.
   * 
   * This is also true for virtual blocks in cases when you create
   * a virtual block that uses a hardware one.
   * 
   * In this method you need to return an array of numbers
   * that correspond to the serial number of the blocks you want
   * to accept. Hardware blocks don't need to return their serial
   * number as they are accepted by default.
   */
  {{ cookiecutter.block_shortname }}.getDroppableBlockList = function() {
    // var accelerometer = 100;
    // var IMU = 130;
    // var temperature = 105;
    // return [accelerometer, IMU, temperature];
  };

  /**
   * Called when a new block is dropped onto this block's 
   * canvas instance.
   */
  {{ cookiecutter.block_shortname }}.onBlockDropped = function(droppedBlock){
    // console.log("A new block has been dropped: %s", droppedBlock.name);
  };

  /**
   * A copy has been dropped on the canvas.
   * I need to keep a copy of the processor to be triggered when
   * new data arrives.
   */
  {{ cookiecutter.block_shortname }}.onAddedToCanvas = function() {

  };

{% endif %}

  /**
   * This method is called when the user hits the "Save"
   * recipe button. Any object you return will be stored
   * in the recipe and can be retrieved during startup (@onLoad) time.
   * Be aware that only primitive properties are stored
   * (Numbers, Strings)
   */
  {{ cookiecutter.block_shortname }}.onBeforeSave = function(){
    return {
      txtTitle: this._txtTitle
    };
  };


{% if cookiecutter.block_category == 'Widget' %}

  var {{ cookiecutter.block_shortname }} = {};

  {{ cookiecutter.block_shortname }}.getInputs = function() {
    return ['Input1', ];
  };

  /**
   * Triggered when added to the canvas.
   * This script should subscribe to all the events and broadcast
   * data to all its copies (by using dispatchDataFeed()).
   * 
   * NOTE: The call is bound to the block's instance, hence 'this'
   * does not refer to this module, for that use 'MotorDriver'
   */
  {{ cookiecutter.block_shortname }}.onLoad = function(){
    var that = this;

    if (this.storedSettings && this.storedSettings.hasOwnProperty('txtTitle')) {
      this._txtTitle = this.storedSettings.txtTitle;

    } else {
      this._txtTitle = "Kitsunei Title";

    }

    this.preloadTemplate('properties.html').then(function(template) {

      that._propTemplate = template;

    }).catch(function(err){
      console.log("Error preloading template: ", err);
    });

    // Define an event listener
    this.onData(function(data, target){
      analyseData.call(that, data, target);
    });

    this._showInput1 = this.canvasIcon.find("#showInput1");

  };

  /**
   * Triggered when the user clicks on a widget.
   * The properties panel is opened automatically.
   * Here you must load the interface elements.
   * NOTE: This is called with the scope set to the
   * Block's object, to refer to this module's properties
   * use this.controller
   */
  {{ cookiecutter.block_shortname }}.onClick = function() {
    Ppanel.loading();

    // Load basic properties?
    this.loadBaseFeeds();

    var that = this;
    // Any processing here
    var html = this._propTemplate(this);
    this._container = this.displayCustomSettings($(html));

    var changeSettings = function(type) {
      if (type === "txtTitle") {
        this._txtTitle = this._container.find("#txtTitle").val();
        this.canvasIcon.find("#txtTitle").text( this._txtTitle );
      }
    };

    this._container.find("#txtTitle").css("value", this._txtTitle);
    this._container.find("#txtTitle").change(changeSettings.bind(this, 'txtTitle'));

    Ppanel.stopLoading();

  };

  function analyseData(data, targetInput){
    if (targetInput === 'Input1') {
      this._showInput1.text(data);
    }
  }

{% endif %}

  return {{ cookiecutter.block_shortname }};

});
