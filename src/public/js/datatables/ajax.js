class Ajax{
	constructor(baseURL,url) {
		this.baseURL= baseURL?baseURL:'http//localhost:1234/api'
		this.urlSet('p')
	}
	urlSet(type){
		if(type==="e"){this.url=`/api/estudiantes`}
		else if(type==="p"){this.url=`/api/padres`}
		else {
			throw console.error('modificador de url desconocido');
		}
	}
	put(d){
		console.log(d);
		$.ajax({
			type: "PUT",
			url: `${this.url}/${d._id}`,
			data: d,
			dataType: "json",
			success:newAjaxSrc(this.url)
		});
	}
	post(d){
		$.ajax({
			type: "POST",
			url: `${this.url}/${d._id}`,
			data: d,
			dataType: "json",
			success:newAjaxSrc(this.url)
		});
	}
	delete(d){
		$.ajax({
			type: 'DELETE',
			url: `${this.url}/${d._id}`,
			dataType: 'json',
			success:newAjaxSrc(this.url)
		})
	}
	postPago(d,p){
		$.ajax({
			type: "POST",
			url: `${this.url}/${d._id}/pago`,
			data: p,
			dataType: "json",
			success:newAjaxSrc(this.url)
		});
	}
	putPago(p){
		console.log(p)
		$.ajax({
			type: "PUT",
			url: `api/pagos/${p._id}`,
			data: p,
			dataType: "json",
			success: newAjaxSrc(this.url)
		});
	}
	deletePago(d,p){
		$.ajax({
			type: "DELETE",
			url:`${this.url}/${d._id}/pago/${p._id}`,
			data: p,
			dataType: "json",
			success: newAjaxSrc(this.url)
		});
	}
}
async function newAjaxSrc(url) {
	let dt=$('#table').DataTable({"retrieve": true});
	console.log("NEW AJAX SRC")
	await dt.ajax.url(url);
	await dt.ajax.reload();
};