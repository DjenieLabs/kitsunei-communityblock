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

  // (OPTIONAL)
  // When there is a getDefaultInput method, the event processor
  // will send the given INPUT for all target blocks (possibility of execute events without opening the LM)
  // IMPORTANT: Output Blocks SHOULD NOT have this method
  {{ cookiecutter.block_shortname }}.getDefaultInput = function() {
    return "";
  };

  // (OPTIONAL)
  // When there is a getDefaultAction method, the event processor
  // execute the given ACTION (possibility of execute events without opening the LM)
  // IMPORTANT: Input Blocks SHOULD NOT have this method
  {{ cookiecutter.block_shortname }}.getDefaultAction = function() {
    return actions[0];
  };

  // Use onBeforeSave for return the data/fields you want to save
  {{ cookiecutter.block_shortname }}.onBeforeSave = function() {
    return { localField1: localField1 };
  };

  /**
   * Use this method to control the visibility of the DataFeed
   * By default it will show() the DataFeed, change it to true due to hide it. 
   */
  {{ cookiecutter.block_shortname }}.hideDataFeed = function() {
    return false;
  };


  // Use hasMissingProperties to open/not open the properties panel
  {{ cookiecutter.block_shortname }}.hasMissingProperties = function() {
    if (localField1.length > 0) {
      return false; // keep it closed
    }
    return true; // will open the properties
  };

  /**
   * Intercepts the properties panel closing action.
   * Return "false" to abort the action.
   * NOTE: Settings Load/Saving will atomatically
   * stop re-trying if the event propagates.
   */
  {{ cookiecutter.block_shortname }}..onCancelProperties = function() {
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
   * NOTE: The call is bind to the block's instance, hence 'this'
   * does not refer to this module, for that use '{{ cookiecutter.block_shortname }}'
   */
  {{ cookiecutter.block_shortname }}.onLoad = function() {
    var that = this;

    // Load previously stored settings
    if (this.storedSettings && this.storedSettings.localField1) {
      localField1 = this.storedSettings.localField1;
    }

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
   * The interace builder is automatically opened.
   * Here we must load the elements.
   * NOTE: This is called with the scope set to the
   * Block object, to emailsess this modules properties
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

  // Returns the current value of my inputs
  // {{ cookiecutter.block_shortname }}.onRead = function(){};

  // Optional event handlers
  {{ cookiecutter.block_shortname }}.onMouseOver = function() {
    // console.log("Mouse Over on ", myself.canvasIcon.id, evt);
  };

  /**
   * A copy has been dropped on the canvas.
   * I need to keep a copy of the processor to be triggered when
   * new data arrives.
   */
  {{ cookiecutter.block_shortname }}.onAddedtoCanvas = function() {

  };

{% endif %}

{% if cookiecutter.block_category == 'Widget' %}

  var {{ cookiecutter.block_shortname }} = {};

  {{ cookiecutter.block_shortname }}.getInputs = function() {
    return ['Input1', ];
  };

  {{ cookiecutter.block_shortname }}.onBeforeSave = function(){
    return {
      txtTitle: this._txtTitle
    };
  };


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
