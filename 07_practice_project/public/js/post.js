function bindEvents(){
	// bat su kien click nut update
	$(".btn-update").click(function(){
		// B1: Lay data tu input ra
		var id = $(".id_cl").val();
		var title = $(".title_cl").val();
		var content = tinymce.get("content_cl").getContent();
		var author = $(".author_cl").val();

		var body = {
			id: id,
			title: title,
			content: content,
			author: author
		}
		//B2: Gui data len server qua ajax
		// -Neu thanh cong  (200) =>update lai data moi ra view
		// - Neu loi (500) => show loi ra
		var base_url = location.protocol + "//" + document.domain + ":" + location.port;
		var url_update = base_url + "/admin/post/edit"

		$.ajax({
			url: url_update,
			type: "PUT",
			data: body,
			datatype: "json",
			success: function(res){
				console.log(res);
				// Neu thanh cong
				if (res.code = 200){
					location.reload();
				}else{
					alert("loi roi")
				}
			}
		});
	});

	
	// Bat su kien delete
	$(".delete_post").click(function(){
		var post_id = $(this).attr("id");

		var body = {
			id: post_id
		}

		var base_url = location.protocol + "//" + document.domain + ":" + location.port;
		var url_delete = base_url + "/admin/post/delete"

		$.ajax({
			url: url_delete,
			type: "DELETE",
			data: body,
			datatype: "json",
			success: function(res){
				console.log(res);
				if(res.code == 200){
					location.reload()
				}else{
					alert("loi roi")
				}
			}
		});
	});
	
}



$(document).ready(function(){
	bindEvents();
});