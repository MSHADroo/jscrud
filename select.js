class Select {
    constructor(params) {
        this.id = params.id ? params.id : 'select-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.title = params.title ? params.title : undefined;
        this.hint = params.hint ? params.hint : '';
        this.disable = params.disable ? 'disabled' : '';
        this.source = params.source ? params.source : undefined;
        this.col = params.col ? params.col : undefined;
        this.depend = params.depend ? params.depend : undefined;

        this.options = '';
        let me = this;

        if (this.source.data) {
            me.options += `<option value="" disabled selected>Select Me!</option>`
            $.each(this.source.data, function (k, v) {
                me.options += `<option value="${v[me.source.def.value]}">${v[me.source.def.title]}</option>`
            });
        }

        if (this.source.ajax) {
            if(!this.depend){
                let res = new Request({
                    url: this.source.ajax,
                    type: 'GET',
                    params: [],
                    onSuccess: function (data) {
                        me.options += `<option value="" disabled selected >Select Me!</option>`
                        $.each(data, function (k, v) {
                            me.options += `<option value="${v[me.source.def.value]}">${v[me.source.def.title]}</option>`
                        });
                        $('#' + me.id).html(me.options);
                        $('#' + me.id).trigger('bind-' + me.id);
                    }
                }).send();
            }

        }


        if (this.holder) {
            $('#' + this.holder).html(this.render());
        }
    }

    render() {
        let col = '';
        if (this.col) {
            col = `col-md-${this.col}`;
        }
        return `<div class="form-group ${col}">
                    <label for="exampleFormControlSelect1">${this.title}</label>
                    <select class="form-control" id="${this.id}" ${this.disable}>
                        ${this.options}
                    </select>
                    <small id="${this.id}Help" class="form-text text-muted">${this.hint}</small>
                </div>`;
    }

}
