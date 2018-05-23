
function bindEvents(){
	// Bat su kien click nut update bai post
	$(".btn_update").click(function(){
		// B1: Lay data tu input ra
		var id = $(".id_cl").val();
		var title = $(".title_cl").val();
		var content = tinymce.get("content").getContent();
		var author = $(".author_cl").val();

		var body = {
			id: id,
			title: title,
			content: content,
			author: author
		};

		// console.log(body);
		// B2: Gui data len server qua Ajax
		// - Neu thanh cong (200) => update lai data moi ra view
		// - Neu loi (500) => Show loi ra
		// http://domain.com:port/path?query=asc
		var base_url = location.protocol + "//" + document.domain + ":" + location.port;
		var url_update = base_url + "/admin/post/edit" 
		$.ajax({
			url: url_update,
			type: "PUT",
			data: body,
			dataType: "json",

			// Nếu controller nhận data và xử lý thành công thì trả về 
			success: function(res){
				console.log(res);
				// Neu thanh cong
				if(res.code == 200){
					location.reload();
				}else{
					alert("Loi, fucking bug");
				}
			}
		});
	});

	$(".delete_post").click(function(){
		var post_id = $(this).attr("id");

		var body= {
			id: post_id
		}

		var base_url = location.protocol + "//" + document.domain + ":" + location.port;
		var url_delete = base_url + "/admin/post/delete"

		$.ajax({
			url: url_delete,
			type: "DELETE",
			data: body,
			dataType: "json",
			success: function(res){
				console.log(res);
				if (res.code == 200){
					location.reload();
				}else{
					alert("loi, fucking bug");
				}
			}
		});
	});
}

$(document).ready(function(){
	bindEvents();
});
