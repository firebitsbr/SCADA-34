example.Toolbar = Class.extend({

	init: function(elementId, view) {
		this.html = $("#" + elementId);
		this.view = view;

		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
		view.on("select", $.proxy(this.onSelectionChanged, this));

		// Inject the UNDO Button and the callbacks
		//
		this.undoButton = $("<button>上一步</button>");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function() {
			this.view.getCommandStack().undo();
		}, this)).button("option", "disabled", true);

		// Inject the REDO Button and the callback
		//
		this.redoButton = $("<button>下一步</button>");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function() {
			this.view.getCommandStack().redo();
		}, this)).button("option", "disabled", true);

		this.delimiter = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the DELETE Button
		//
		this.deleteButton = $("<button>删除</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function() {
			var node = this.view.getCurrentSelection();
			var command = new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		}, this)).button("option", "disabled", true);

		// 清除画布
		
		this.delimiter1 = $("<span class='toolbar_delimiter'>&nbsp;&nbsp;</span>");//添加空格
		this.html.append(this.delimiter1);
		this.clearButtons = $("<button>清除画布</button>");
		this.html.append(this.clearButtons);
		this.clearButtons.button().click($.proxy(function() {
			var result = confirm('你确定要删除全部画面吗！');
			if (result) {
				//				 	 alert('删除成功！');
				alert("清除画布");
				this.view.clear();
				$("#myBgimage").attr("src", ""); //清除用户上传的图片
			} else {
				alert('不删除！');
			}
		}, this)).button("option", "disabled", false);


		//上传图片
		this.delimiter2 = $("<span class='toolbar_delimiter'>&nbsp;&nbsp;&nbsp;</span>");
		this.html.append(this.delimiter2);

		this.choseImageButtons = $("<button>上传图片</button>");
		this.html.append(this.choseImageButtons);
		this.choseImage = $("<input type=\"file\" id=\"fileField\" size=\"28\"  style = \"opacity: 0;display:none;\" onchange=\"showPreview(this)\" />");
		this.html.append(this.choseImage);

		this.choseImageButtons.button().click($.proxy(function() {
//			alert("上传图片");
			// showPreview(this.choseImageButtons);
			$("#fileField").click();
			
		}, this)).button("option", "disabled", false);

	},

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	onSelectionChanged: function(emitter, figure) {
		this.deleteButton.button("option", "disabled", figure === null);
	},

	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged: function(event) {
		this.undoButton.button("option", "disabled", !event.getStack().canUndo());
		this.redoButton.button("option", "disabled", !event.getStack().canRedo());
	}
});