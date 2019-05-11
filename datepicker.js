class DatePicker {
    constructor(params) {
        this.id = params.id ? params.id : 'datepicker-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.title = params.title ? params.title : '';
        this.placeholder = params.placeholder ? params.placeholder : '';
        this.hint = params.hint ? params.hint : '';
        this.disable = params.disable ? 'readonly' : '';
        this.col = params.col ? params.col : undefined;


        if (this.holder) {
            $('#' + this.holder).html(this.render());
        }
    }

    render() {
        let col = '';
        if (this.col) {
            col = `col-md-${this.col}`;
        }
        return `<div class="input-group date" id="${this.id}" data-target-input="nearest">
                    <label for="${this.id}">${this.title}</label>
                    <input type="text" class="form-control datetimepicker-input" data-target="#${this.id}"/>
                    <div class="input-group-append" data-target="#${this.id}" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                    <small id="${this.id}Help" class="form-text text-muted">${this.hint}</small>
                </div>`
    }

    init() {
        $('#' + this.id).on("init-" + this.id, function () {
            $(`#${this.id}`).datetimepicker({});
        });
    }

}