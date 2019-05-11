class Form {
    constructor(params) {
        this.id = params.id ? params.id : 'form-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : undefined;

        this.columns = params.columns ? params.columns : undefined;
        this.actions = params.actions ? params.actions : undefined;

        if (this.holder) {
            $('#' + this.holder).html(this.render());
            this.init();
        }
    }

    makeCleanColumn() {
        let i = 1;
        let me = this;
        me.cleanColumn = [];
        $.each(this.columns, function (k, v) {
            if (!Array.isArray(v)) {
                if (v.col == undefined) {
                    v.col = 12;
                }
                v.row = i;
                me.cleanColumn.push(v);
                i++;
            } else {
                let length = v.length;
                $.each(v, function (k2, v2) {
                    if (v2.col == undefined) {
                        v2.col = 12 / length;
                    }
                    v2.row = i;
                    me.cleanColumn.push(v2);
                });

                i++;
            }
        });
        this.maxRow = i - 1;
    }


    generateElements() {
        let input = ['text', 'email', 'password', 'number', 'date', 'hidden', 'label'];
        let me = this;
        me.initArray = [];
        me.elementsHtml = '';
        this.makeCleanColumn();
        for (let i = 1; i <= this.maxRow; i++) {
            let rowItems = this.cleanColumn.filter(x => x.row === i);
            me.elementsHtml += `<div class="form-row">`;
            $.each(rowItems, function (k, v) {
                if (input.indexOf(v.type) !== -1) {
                    me.elementsHtml += new Input({
                        id: v.id,
                        title: v.title,
                        type: v.type,
                        placeholder: v.placeholder,
                        disable: v.disable,
                        hint: v.hint,
                        col: v.col
                    }).render();
                } else if (v.type === 'select') {
                    me.elementsHtml += new Select({
                        id: v.id,
                        title: v.title,
                        disable: v.disable,
                        source: v.source,
                        hint: v.hint,
                        depend: v.depend,
                        col: v.col
                    }).render();
                } else if (v.type === 'textarea') {
                    me.elementsHtml += new TextArea({
                        id: v.id,
                        title: v.title,
                        placeholder: v.placeholder,
                        disable: v.disable,
                        hint: v.hint,
                        col: v.col
                    }).render();
                } else if (v.type === 'date') {
                    me.elementsHtml += new DatePicker({
                        id: v.id,
                        title: v.title,
                        placeholder: v.placeholder,
                        disable: v.disable,
                        hint: v.hint,
                        col: v.col
                    }).render();
                    me.initArray.push(v.id);
                } else if (v.type === 'label') {
                    me.elementsHtml += new Label({
                        id: v.id,
                        title: v.title,
                        placeholder: v.placeholder,
                        col: v.col
                    }).render();
                }
            });
            me.elementsHtml += `</div>`;
        }

    }

    generateActions() {
        let me = this;
        me.actionsHtml = '';
        $.each(this.actions, function (k, v) {
            me.actionsHtml += new Button({
                id: v.id,
                title: v.title,
                type: v.type,
                disable: v.disable,
                action: v.action,
                params: v.params
            }).render();
        });
    }

    render() {
        this.generateElements();
        this.generateActions();
        return `<form id="${this.id}">${this.elementsHtml}${this.actionsHtml}</form>`;
    }

    renderElements() {
        this.generateElements();
        return `<form id="${this.id}">${this.elementsHtml}</form>`;
    }

    renderActions() {
        this.generateActions();
        return this.actionsHtml;
    }


    init() {
        // $.each(this.initArray, function (k, v) {
        //     $(`#${v}`).trigger('init-' + v);
        // })
        this.initSelect();
    }

    getData() {
        let me = this;
        let data = {};
        $.each(this.cleanColumn, function (k, v) {
            data[v.id] = $('#' + v.id).val();
        });
        return data;
    }

    fillData(data) {
        let me = this;
        $.each(this.cleanColumn, function (k, v) {
            $.each(data, function (k2, v2) {
                if (v.id === k2) {
                    if (v.type === 'select') {
                        $('#' + v.id).on("bind-" + v.id, function () {
                            $('#' + v.id).val(v2).trigger('change');
                            return true;
                        });
                    }
                    $('#' + v.id).val(v2).trigger('change');
                }
            });
        });
    }

    clear() {
        $.each(this.cleanColumn, function (k, v) {
            $('#' + v.id).val();
        });
    }

    showErrors(errors) {
        $('.invalid-feedback').remove();
        $.each(errors, function (k, v) {
            $.each(v, function (k2, v2) {
                $('#' + k).after(`<div class="invalid-feedback">${v2}</div>`);
                $('#' + k).addClass('is-invalid');
            });
        });
    }

    initSelect(){
        $.each(this.cleanColumn , function (k,v) {
            if(v.type == 'select'){
                $('#' + v.id).select2({
                    // dir: 'rtl',
                    allowClear: true,
                    // language: 'fa',
                    placeholder: 'Select Me!'
                });
            }
            if(v.type == 'select' && v.depend){
                $.each(v.depend , function (k2 , v2){
                    $('#' + v2).on('change',function() {
                        let query = [];
                        $.each(v.depend , function(k3 , v3){
                            query.push($('#' + v3).val());
                        });
                        let id = this.value;
                        new Request({
                            url: v.source.ajax +'/' + query.join('/') ,
                            type: 'GET',
                            params: [],
                            onSuccess: function (data) {
                                let options = `<option value="" disabled selected >Select Me!</option>`;
                                $.each(data, function (k4, v4) {
                                    options += `<option value="${v4[v.source.def.value]}">${v4[v.source.def.title]}</option>`
                                });
                                $('#' + v.id).html(options);
                                $('#' + v.id).trigger('bind-' + v.id);
                            }
                        }).send();
                    });
                });

            }
        })
    }
}