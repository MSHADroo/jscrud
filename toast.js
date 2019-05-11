
class Toast {
    constructor(params) {
        this.id = params.id ? params.id : 'toast-' + Math.floor(Math.random() * 101);
        this.title = params.title ? params.title : '';
        this.message = params.message ? params.message : '';
    }

    render() {
        return `
                  <div class="toast" style="position: absolute; bottom: 10px; right: 10px; min-width: 300px;">
                    <div class="toast-header">
                      <!--<img src="..." class="rounded mr-2" alt="...">-->
                      <strong class="mr-auto">${this.title}</strong>
                      <small>${new Date().toLocaleTimeString()}</small>
                      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="toast-body">
                       ${this.message}
                    </div>
                  </div>
                `;
    }

    show() {
        let html = this.render();
        $('body').append(html);
        $('.toast').toast({delay: 3000});
        $('.toast').toast('show');
        $('.toast').on('hidden.bs.toast', function (e) {
            $('.toast').toast('dispose');
            $('.toast').remove();
        })
    }

    hide() {
        $('#' + this.id).toast('hide');
    }
}