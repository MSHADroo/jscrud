class Label {
    constructor(params) {
        this.id = params.id ? params.id : 'label-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.title = params.title ? params.title : undefined;
        this.col = params.col ? params.col : undefined;

        this.options = '';
        let me = this;

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
                    <label>${this.title}</label>
                </div>`;
    }

}