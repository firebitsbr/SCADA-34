function showPreview(source) {

	// alert("1111");
//	var file = document.getElementById("fileField").files[0];
	 var file = source.files[0];
	if (!/image\/\w+/.test(file.type)) {
		alert("请确保文件为图像类型");
		return false;
	}
	// var val = file.name;
	// var texts = document.getElementById("type-file-text");
	// texts.value = val;
	if (window.FileReader) {
		var fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = function(e) {
			// localStorage.setItem("num", "1");
//			console.log($("#sign1Span").text());
//			$("#sign1Span").text("false");//设置图片完成可以进行存储
//			$("#sign2Span").text("false");//  false 表示进行了选择图片的操作
//			console.log($("#sign1Span").text());
			// console.log(e.target.result);
			document.getElementById("myBgimage").src = e.target.result;
			// return e.target.result;

			//			$(".image").src = e.target.result;
			//			document.getElementById("center").style.background = "url(" + e.target.result + ")";


		};
	}
}