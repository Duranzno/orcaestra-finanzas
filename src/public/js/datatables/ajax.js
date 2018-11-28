class Ajax{
	constructor(baseURL,isStudentTable) {
		this.baseURL= baseURL?baseURL:'http//localhost:1234/api'
		this.urlSet(isStudentTable)
	}
	urlSet(isStudentTable){
		if(typeof isStudentTable==='undefined') isStudentTable=true;
		this.url=(isStudentTable)?`/api/estudiantes`:`/api/padres`
	}
	put(d){
		console.log(d);
		$.ajax({
			type: "PUT",
			url: `${this.url}/${d._id}`,
			data: d,
			dataType: "json",
			success:this.newAjaxSrc()
		});
	}
	post(d){
		$.ajax({
			type: "POST",
			url: `${this.url}/${d._id}`,
			data: d,
			dataType: "json",
			success:this.newAjaxSrc()
		});
	}
	delete(d){
		$.ajax({
			type: 'DELETE',
			url: `${this.url}/${d._id}`,
			dataType: 'json',
			success:this.newAjaxSrc()
		})
	}
	postPago(d,p){
		$.ajax({
			type: "POST",
			url: `${this.url}/${d._id}/pago`,
			data: p,
			dataType: "json",
			success:this.newAjaxSrc()
		});
	}
	putPago(p){
		console.log(p)
		$.ajax({
			type: "PUT",
			url: `api/pagos/${p._id}`,
			data: p,
			dataType: "json",
			success: this.newAjaxSrc()
		});
	}
	deletePago(d,p){
		$.ajax({
			type: "DELETE",
			url:`${this.url}/${d._id}/pago/${p._id}`,
			data: p,
			dataType: "json",
			success: this.newAjaxSrc()
		});
	}
	uploadExcel(data,url){
		data.append('planilla', this.file_data);
    const excelThis=this;
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: url,
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data) {
        console.log('uploadExcel| SUCCESS : ', data);
      	excelThis.newAjaxSrc();
      },
      error: function(e) {
        console.log('uploadExcel| ERROR : ', e);
      },
    });

	}

	async newAjaxSrc(newUrl) {
		let dt=$('#table').DataTable({"retrieve": true});
		await dt.ajax.url((typeof url==="undefined")?newUrl:this.url);	
		await dt.ajax.reload();
	};
	static async updateTable(url){
		let dt=$('#table').DataTable({"retrieve": true});
		await dt.ajax.url(url);
		await dt.ajax.reload();
	}

}