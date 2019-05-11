class CheckBox{
    constructor(params) {
        this.id = params.id ? params.id : 'checkbox-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.title = params.title ? params.title : undefined;
        this.type = params.type ? params.type : undefined;
        this.placeholder = params.placeholder ? params.placeholder : undefined;
        this.hint = params.hint ? params.hint : undefined;
        this.readonly = params.readonly ? 'disabled' : undefined;


        if(this.holder){
            $('#' + this.holder).html(this.render());
        }
    }

    render() {
        return `<div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" ${this.readonly}>
                  <label class="form-check-label" for="defaultCheck1">
                    Default checkbox
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
                  <label class="form-check-label" for="defaultCheck2">
                    Disabled checkbox
                  </label>
                </div>`;
    }

}