class Modal {
    constructor(params) {
        this.id = params.id ? params.id : 'modal-' + Math.floor(Math.random() * 101);
        this.header = params.header ? params.header : '';
        this.body = params.body ? params.body : '';
        this.footer = params.footer ? params.footer : '';
        this.size = params.size === 'big' ? 'modal-lg' : 'modal-sm';
    }

    set(params) {
        if (params.header) {
            this.header = params.header;
        }
    }

    render() {
        return `
            <div class="modal fade" id="${this.id}" tabindex="-1" role="dialog" aria-labelledby="${this.header}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ${this.size}" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${this.header}">${this.header}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    <div class="modal-body">
                        ${this.renderedBody}
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            ${this.renderedFooter}
                        </div>
                    </div>
                </div>
            </div>`
    }

    show() {
        if (typeof this.body === 'object' && this.body instanceof Form) {
            this.renderedBody = this.body.renderElements();
            this.renderedFooter = this.body.renderActions();
        }else if (typeof this.body === 'object' && this.body instanceof Grid) {
            this.renderedBody = this.body.render();
            this.renderedFooter = this.footer;
        } else {
            this.renderedBody = this.body;
            this.renderedFooter = this.footer;
        }
        let html = this.render();
        $('body').append(html);
        $('#' + this.id).modal('show');
        $('#' + this.id).on('hidden.bs.modal', function (e) {
            $('#' + this.id).modal('dispose');
            $('#' + this.id).remove();
        });
        if (typeof this.body === 'object' && this.body instanceof Form) {
            this.body.init();
        }else if (typeof this.body === 'object' && this.body instanceof Grid) {
             // this.body.load();
        }


    }

    hide() {
        $('#' + this.id).modal('hide');
    }
}