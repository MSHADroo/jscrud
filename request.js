class Request {
    constructor(params) {
        this.url = params.url ? params.url : undefined;
        this.type = params.type ? params.type : undefined;
        this.params = params.params ? params.params : undefined;
        this.onSuccess = params.onSuccess ? params.onSuccess : undefined;
        this.onFailure = params.onFailure ? params.onFailure : undefined;
        this.formSubmit = params.formSubmit ? params.formSubmit : undefined;
        this.form = null;
    }


    send() {
        let me = this;

        if(me.type.toLowerCase() === 'put'){
            me.type = 'POST';
        }

        var dataHandler = me.params;

        if(this.formSubmit) {
            // dataHandler = new FormData(document.getElementById('product-form'));
            dataHandler  = new FormData();

            let me = this;

            $.each(me.params, function (key_1, val) {
                if ((typeof val === "undefined" ? "undefined" : typeof(val)) === "object") {
                    $.each(me.params[key_1], function (key_2, val2) {
                        console.log(key_1);
                        console.log(val);
                        console.log(key_2);
                        console.log(val2);
                        if ((typeof val2 === "undefined" ? "undefined" : typeof(val2)) === 'object' /*&& val2 instanceof File*/) {
                            var k0 = key_1.substr(0, key_1.lastIndexOf('_file'));
                            dataHandler.append(k0, val2);
                            delete me.params[key_1][key_2];
                        }
                    });
                }else{
                    dataHandler.append(key_1, val);
                }
            });
        }


        $.ajax({
            url: me.url,
            type: me.type,
            data: dataHandler,
            // enctype: 'multipart/form-data',
            // cache: false,
            // dataType: 'json',
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data, textStatus, jqXHR) {
                // console.log(data);
                // console.log(textStatus);
                // console.log(jqXHR);
                if (jqXHR.status === 200) {
                    me.onSuccess(data);
                } else {
                 if (me.verbose == true) {
                        new Toast({
                            id: 'toast-fail',
                            title: 'Fail!',
                            message: data.message,
                            type: 'error'
                        }).show();
                    }
                    me.onFailure(data);
                }
                // return data;
                // e.success ? (n.onSuccess(e.data), notification.set("type", "success")) : (n.onFailure(e.data), notification.set("type", "error")),
                // e.message && n.verbose && notification.show(e.message)
            },
            error: function (jqXHR, textStatus, errorThrown) {
               new Toast({
                    id: 'toast-fail',
                    title: 'Internal Server Error',
                    message: jqXHR.responseJSON.message,
                    type: 'error'
                }).show();
                // console.log(jqXHR.status);
                // console.log(textStatus);
                // console.log(errorThrown);
                // console.log(jqXHR);

                if (jqXHR.status === 422) {
                    me.onFailure(jqXHR.responseJSON);
                } else if (jqXHR.status === 403) {
                    me.onFailure(jqXHR.responseJSON);
                }
            }
        });

        // if(this.formSubmit !== undefined) {
        //     let form = document.forms.namedItem("product-form");
        //     let formData  = new FormData(form);
        //
        //     let me = this;
        //     $.each(me.params, function (key, val) {
        //         if (typeof val === "object" && val instanceof FileList) {
        //             let k0 = key.substr(0, key.lastIndexOf('_file'));
        //             formData.append(k0, val);
        //             delete me.params[key];
        //         }
        //     });
        //     formData.append('params',this.params);
        //     params = formData;
        // }


    }
}