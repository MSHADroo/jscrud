class File {
    constructor(params) {
        this.id = params.id ? params.id : 'file-' + Math.floor(Math.random() * 101);
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

        return `<div class="form-group ${col}">
                    <label for="${this.id}">${this.title}</label>
<!--                    <input type="file" class="custom-file-input" id="${this.id}" aria-describedby="${this.id}Help" placeholder="${this.placeholder}" ${this.disable}>      -->
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="${this.id}" name="${this.id}" aria-describedby="${this.id}Help" placeholder="${this.placeholder}" ${this.disable}>
                        <label class="custom-file-label" for="${this.id}">Choose file</label>
                    </div>             
                    <small id="${this.id}Help" class="form-text text-muted">${this.hint}</small>
                  </div>`;
    }

}