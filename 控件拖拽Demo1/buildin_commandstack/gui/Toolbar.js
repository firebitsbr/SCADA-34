example.Toolbar = Class.extend({

	init: function(elementId, view) {
		this.html = $("#" + elementId);
		this.view = view;

		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// 
		// 为删除按钮的选中状态注册一个选中监听
		//
		view.on("select", $.proxy(this.onSelectionChanged, this));

		// 添加撤销按钮及回调
		//
		this.undoButton = $("<button>上一步</button>");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function() {
			this.view.getCommandStack().undo();
		}, this)).button("option", "disabled", true);

		// 添加重做按钮及回调
		//
		this.redoButton = $("<button>下一步</button>");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function() {
			this.view.getCommandStack().redo();
		}, this)).button("option", "disabled", true);

		this.delimiter = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// 添加删除按钮
		//
		this.deleteButton = $("<button>删除</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function() {
			var node = this.view.getCurrentSelection();
			var command = new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		}, this)).button("option", "disabled", true);

		// 清除画布

		this.delimiter1 = $("<span class='toolbar_delimiter'>&nbsp;&nbsp;</span>"); //添加空格
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
		this.delimiter2 = $("<span class='toolbar_delimiter'>&nbsp;&nbsp;&nbsp;</span>"); //添加空格
		this.html.append(this.delimiter2);

		this.choseImageButtons = $("<button>上传图片</button>");
		this.html.append(this.choseImageButtons);
		this.choseImage = $("<input type=\"file\" id=\"fileField\" size=\"28\"  style = \"opacity: 0;display:none;\" onchange=\"showPreview(this)\" />"); //files按钮---隐藏
		this.html.append(this.choseImage);
		this.choseImageButtons.button().click($.proxy(function() {
			$("#fileField").click();

		}, this)).button("option", "disabled", false);

		this.delimiter3 = $("<span class='toolbar_delimiter'>&nbsp;&nbsp;&nbsp;</span>");//添加空格
		this.html.append(this.delimiter3);
		this.saveButton = $("<button>保存设置</button>");
		this.html.append(this.saveButton);
		this.saveButton.button().click($.proxy(function() {

			//判断浏览器是否支持本地存储
			if (typeof(Storage) !== "undefined") {

				var writer = new draw2d.io.json.Writer();
				writer.marshal(this.view, function(json) {

					// console.log(JSON.stringify(json, null, 2));

					var strjsonData = JSON.stringify(json, null, 2);

					localStorage.setItem("CanvasData", strjsonData); //存储图标
					localStorage.clear();
					// console.log(arrayData);
				});
			} else {
				alert("NO");
			}

			// displayJSON(this.view);

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
		// this.saveButton.button("option", "disabled", figure === null);
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