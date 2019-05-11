class Button {
    constructor(params) {
        this.id = params.id ? params.id : 'btn-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.title = params.title ? params.title : undefined;
        this.type = params.type ? params.type : undefined;
        this.action = params.action ? params.action : undefined;
        this.params = params.params ? params.params : '';
        this.icon = params.icon ? params.icon : '';
        this.disable = params.disable ? 'disabled' : '';

        if (this.type === 'save') {
            this.bs4type = 'info';
            if (!this.icon) {
                this.icon = 'fas fa-pen';
            }
            if (!this.title) {
                this.title = 'Save';
            }
        } else if (this.type === 'delete') {
            this.bs4type = 'danger';
            if (!this.icon) {
                this.icon = 'fa fa-delete';
            }
            if (!this.title) {
                this.title = 'Delete';
            }
        } else if (this.type === 'insert') {
            this.bs4type = 'success';
            if (!this.icon) {
                this.icon = 'fa fa-plus';
            }
            if (!this.title) {
                this.title = 'New';
            }
        } else if (this.type === 'search') {
            this.bs4type = 'info';
            if (!this.icon) {
                this.icon = 'fas fa-search';
            }
            if (!this.title) {
                this.title = 'Search';
            }
        }


        if (this.holder) {
            $('#' + this.holder).html(this.render());
        }
    }

    render() {
        if (this.icon) {
            this.icon = `<i class="${this.icon} "></i>`
        }

        return `<button type="button" class="btn btn-${this.bs4type}" onclick="${this.action}(${this.params})" ${this.disable}>${this.icon} ${this.title}</button>`;
    }

}