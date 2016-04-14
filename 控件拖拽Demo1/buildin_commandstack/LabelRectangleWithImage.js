/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var LabelRectangleWithImage= draw2d.shape.basic.Rectangle.extend({

  
    NAME: "LabelRectangleWithImage",
    init:function(attr)
    {
      this._super(attr);
      this.resizeable = false;
    // this.height = 500;
    // this.width = 500;
      // Create any Draw2D figure as decoration for the connection
      //
      this.label = new draw2d.shape.basic.Label({text:"I'm a Label", color:"#0d0d0d", fontColor:"#0d0d0d"});

      var img1 = new draw2d.shape.basic.Image({path:"img/Desert.jpg", width:this.height,height:this.height, resizeable:false});
  //      img1.on("click",function(){alert("hit icon 1");});
  //      // this.add(img1);


    // this.icons = new draw2d.shape.layout.HorizontalLayout()
    //                     .setStroke(0)
    //                     .setRadius(this.getRadius())
    //                     .setBackgroundColor("#f7f7f7");;
        

       
        // var img1 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        // var img2 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        // var img3 = new draw2d.shape.basic.Image({path:"icon.gif", width:30,height:30, resizeable:false});
        
        img1.on("click",function(){
          // this.path = "img/yjx.jpg";
          console.log(img1.resizeable);
          console.log(img1.path);
          img1.path = "img/yjx.jpg";
          console.log(img1.path);
          // alert("hit icon 1");
        });
        // img2.on("click",function(){alert("hit icon 2");});
        // img3.on("click",function(){alert("hit icon 3");});
        
        // this.icons.add(img1);                
        // this.icons.add(img2);                
        // this.icons.add(img3);                
        // this.icons.add(new draw2d.shape.basic.Label({text:"icons"}));                
               
        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        // this.add(new draw2d.shape.basic.Label({text:"Header Header Header Header Header"}));
        this.add(img1,new draw2d.layout.locator.CenterLocator(this));
        // this.add(new draw2d.shape.basic.Label({text:"Fixed Footer"}));
        

      
      // add the new decoration to the connection with a position locator.
      //
      this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
      this.createPort("input");
      this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
    }
});
