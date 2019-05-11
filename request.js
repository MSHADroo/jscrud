class Request {
    constructor(params) {
        this.url = params.url ? params.url : undefined;
        this.type = params.type ? params.type : undefined;
        this.params = params.params ? params.params : undefined;
        this.onSuccess = params.onSuccess ? params.onSuccess : undefined;
        this.onFailure = params.onFailure ? params.onFailure : undefined;

    }

    prepareData() {
        // let form = $('#event-form');
        this.form = new FormData(form[0]);
        let me = this;

        // $.each(me.params, function (key_1, val) {
        //     if (typeof val === "object") {
        //         $.each(me.params[key_1], function (key_2, val) {
        //             if (typeof val === 'object' && val instanceof File) {
        //                 let k0 = key_2.substr(0, key_2.lastIndexOf('_file'));
        //                 me.form.append(k0, val);
        //                 delete me.params[key_1][key_2];
        //             }
        //         });
        //     }
        // });
        // // $.each(this.params, function (i, e) {
        // //     "object" === (void 0 === e ? "undefined" : _typeof(e)) && $.each(me.params[i], function (e, t) {
        // //         if ("object" === (void 0 === t ? "undefined" : _typeof(t)) && t instanceof File) {
        // //             var a = e.substr(0, e.lastIndexOf("_file"));
        // //             me.form.append(a, t), delete me.params[i][e]
        // //         }
        // //     })
        // // }),
        // this.form.append("p", JSON.stringify(me.params));
    }

    send() {
        // this.prepareData();
        let me = this;
        $.ajax({
            url: this.url,
            type: this.type,
            data: this.params,
            // data: this.form,
            // data: this.form,
            cache: !1,
            // dataType: "json",
            headers: {
                token: "Request"
            },
            // statusCode: {
            // 0: function() {
            //     alert('0 status code! user error');
            // },
            // 400: function() {
            //     alert('400 status code! user error');
            // },404: function() {
            //     alert('404 status code! user error');
            // },
            // 500: function() {
            //     alert('500 status code! server error');
            // }
            // },
            // processData: !1,
            // contentType: !1,
            success: function (data, textStatus, jqXHR) {
                if (textStatus === 'success') {
                    me.onSuccess(data);
                } else {
                    me.onFailure(data);
                }
                // return data;
                // e.success ? (n.onSuccess(e.data), notification.set("type", "success")) : (n.onFailure(e.data), notification.set("type", "error")),
                // e.message && n.verbose && notification.show(e.message)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
                console.log(jqXHR);

                if (jqXHR.status === 422) {
                    me.onFailure(jqXHR.responseJSON);
                } else if (jqXHR.status === 403) {
                    me.onFailure(jqXHR.responseJSON);
                }
            }
        })
    }
}