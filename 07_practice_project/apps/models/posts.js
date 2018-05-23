var db = require ("../common/database.js");

var conn = db.getConnection();

function getAllPosts(){
	return new Promise(function(resolve, reject){
		let query = conn.query('SELECT * FROM posts', function(err, posts){
			if (err){
				reject(err);
			}else{
				resolve(posts);
			}
		});
	});
}

function addPost(params){
	if (params){
		return new Promise (function(resolve, reject){
			let query = conn.query('INSERT INTO posts SET ?', params, function(err, results, fields){
				if (err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}else{
		return false;
	}
}

function getPostById(id){
	return new Promise(function(resolve, reject){
		let query = conn.query('SELECT * FROM posts WHERE ?', {id: id}, function (err, posts){
			if (err){
				reject(err)
			}else{
				resolve(posts)
			}
		});
	});
}

function updatePosts(params){
	if (params){
		return new Promise (function(resolve, reject){
			let query = conn.query('UPDATE posts SET title =?, content =?, author =?, updated_at =? WHERE id=?', [params.title, params.content, params.author, new Date(), params.id], function(err, results, fields){
				if (err){
					reject(err)
				}else{
					resolve(results);
				}
			});
		});
	}else{
		return false;
	}
}


function deletePost(id){
	if (id){
		return new Promise (function(resolve, reject){
			let query = conn.query('DELETE FROM posts WHERE id=?', [id], function(err, results, fields){
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}else{
		return false
	}
}
module.exports = {
	getAllPosts: getAllPosts,
	addPost: addPost,
	getPostById: getPostById,
	updatePosts: updatePosts,
	deletePost: deletePost
}