/**
 * Copyright (C) 2010 Sergey I. Sharybin
 */

function _UIToggleButton ()
{
  _UIButton.call (this);

  /**
   * Set className for node depending on button toggle state
   */
  this.setToggledStyle = function (node)
    {
      node = node || this.dom;

      if (this.toggled)
        {
          node.addClass ('UIToggleButtonToggled');
        }
      else
        {
          node.removeClass ('UIToggleButtonToggled');
        }
    };

  /**
   * Build DOM tree for button
   */
  this.doBuild = function ()
    {
      var dom = UIButton.prototype.doBuild.call (this);
      this.setToggledStyle (dom);
      return dom;
    };

  this.doOnRelease = function ()
    {
      UIButton.prototype.doOnRelease.call (this);

      this.setToggled (!this.toggled);
      this.onToggle ();
    };

  /**
   * Get toggled state
   */
  this.getToggled = function ()
    {
      return this.toggled;
    };

  /**
   * Set toggled state
   */
  this.setToggled = function (toggled)
    {
      this.toggled = toggled;
      this.updateBinding (this.toggled);

      if (this.dom)
        {
          this.setToggledStyle ();
        }
    };

  /**
   * Events'stubs
   */
  this.onToggle   = function () {}
}

function UIToggleButton (opts)
{
  opts = opts || {};

  UIButton.call (this, opts);

  this.toggled = defVal(opts['toggled'], false);

  /* events avaliable for attaching */
  this.events = this.events.concat (['onToggle']);
}

UIToggleButton.prototype = new _UIToggleButton;
UIToggleButton.prototype.constructor = UIToggleButton;
