/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var LabelRectangle= draw2d.shape.basic.Rectangle.extend({
    NAME: "LabelRectangle",
    init:function(attr)
    {
      this._super(attr);
      this.height = 100;
      this.width = 100;
      // this.prototype.titles = "1111";
    
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new draw2d.shape.basic.Label({text:"I'm a Label", color:"#0d0d0d", fontColor:"#0d0d0d"});
      
      // add the new decoration to the connection with a position locator.
      //
      this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
      
      this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
    }
});
