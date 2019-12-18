class Grid {
    constructor(params) {
        this.id = params.id ? params.id : 'grid-' + Math.floor(Math.random() * 101);
        this.holder = params.holder ? params.holder : '';
        this.ajax = params.ajax ? params.ajax : undefined;
        this.data = params.data ? params.data : undefined;
        this.columns = params.columns ? params.columns : undefined;
        this.row_number = params.row_number ? params.row_number : undefined;
        this.actions = params.actions ? params.actions : undefined;
        this.params = params.params ? params.params : undefined;
        this.grid = null;

        let me = this;
        $.each(this.columns, function (k, v) {
            if (v.type) {
                if (v.type === 'price') {
                    v.render = function (data, type, row, meta) {
                        if (data) {
                            return me.priceCommaSeparator(data);
                        } else {
                            return ''
                        }
                    };
                }
                if (v.type === 'link') {
                    v.render = function (data, type, row, meta) {
                        if (data) {
                            return `${data}  <a href=${data} target="_blank" ><i class="fas fa-external-link-alt"></i><a>`
                        } else {
                            return '';
                        }
                    };
                }
                if (v.type === 'jalali') {
                    v.render = function (data, type, row, meta) {
                        if (data) {
                            var date = data.split(' ');
                            if (date[1]) {
                                return moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD') + ' ' + date[1];
                            } else {
                                return moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
                            }
                        } else {
                            return '';
                        }
                    };
                }
            }
        });

        // var me = this;
        this.default = {
            // ajax: {
            //     dataSrc: ""
            // },
            // dataSrc: "",
            dom: "<'row'<'col-sm-12 col-md-6 dt-search'f><'col-sm-12 col-md-3 dt-list'l><'col-sm-12 col-md-3 dt-button'B>>" +
                "<'row'<'col-sm-12 dt-table'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            buttons: ["colvis", "excel", "print", "copy"],
            columns: this.columns,
            // columnDefs: [{
            //         targets: 2,
            //         render: $.fn.dataTable.render.renderDate()
            //     }
            // ],
            // ordering: false,
            // order: [[0, 'asc']],
            // bSort: false,
            aaSorting: [],
            stateSave: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Show All"]],
            pagingType: "full_numbers",
            pageLength: 50,
            deferRender: true,
            responsive: true,
            language: {
                buttons: {
                    copy:
                        '<i class="far fa-copy" aria-hidden="true" title="Copy"></i>',
                    excel:
                        '<i class="fas fa-table" aria-hidden="true" title="Excel"></i>',
                    print: '<i class="fa fa-print" aria-hidden="true" title="Print"></i>',
                    colvis:
                        '<i class="fa fa-eye-slash" aria-hidden="true" title="Show/Hide Columns"></i>'
                }
            },
            orderCellsTop: true,
            fixedHeader: true,
            initComplete: function () {
                var filter = [];
                $.each(me.columns, function (k, v) {
                    if (v.filter) {
                        filter.push(k);
                    }
                });


                this.api().columns().every(function () {
                    var column = this;

                    if (filter.includes(column[0][0])) {
                        var select = $('<br><select><option value="">All</option></select>')
                            .appendTo($(column.header())/*.empty()*/)
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );

                                column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            });

                        column.data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });

                    }
                });
            }
            // processing: true,
            // serverSide: true,
        };

        if (this.row_number) {
            this.columns.unshift({
                data: null, title: 'Row', searchable: false, orderable: true,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            });

        }

        if (this.actions) {
            let me = this;
            this.columns.push({
                data: null, title: 'Manage', searchable: false, orderable: false,
                render: function (data, type, row, meta) {
                    let html = '';
                    $.each(me.actions, function (k, v) {
                        html += `<div class="${v.icon} fa-lg" style="padding-left:10px;cursor: pointer;font-size: 24px " title="${v.title}" onclick="${v.action}(${meta.row})"></div>`
                    });
                    return html;
                }
            });
        }


        if (this.ajax) {
            this.default.ajax = {
                url: this.ajax,
                dataSrc: ''
            };
            if (this.params) {
                this.default.ajax.data = this.params;
            }
        } else if (this.data) {
            this.default.data = this.data;
        }


        // let me = this;
        // $.each(this.columns,function (k ,v ){
        //     me.default.columns.push({data: v.name , title : v.title});
        //     // if(v.render){
        //     //
        //     // }
        // });

        if (this.holder) {
            $('#' + this.holder).html(this.render());
        }
    }

    render() {
        return `<table id="${this.id}" class="table table-striped table-bordered table-light table-full-width" width="100%"></table>`;
    }

    load() {
        if (this.grid) {
            this.destroy();
        }
        if (this.holder) {
            $('#' + this.holder).html(this.render());
        }
        let me = this;
        let table = $("#" + this.id).DataTable(this.default);
        this.grid = table;
        // alert(me.default.ajax);
        if (me.default.ajax) {
            table.on('xhr', function () {
                me.data = table.ajax.json();
            });
        }
    }

    setParams(data) {
        this.params = data;
        if (this.params) {
            this.default.ajax.data = this.params;
        }
    }


    priceCommaSeparator(x) {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    setAjaxRoute(uri){
        this.default.ajax = {
            url: uri,
            dataSrc: ''
        };
    }

    destroy(){
        this.grid.destroy();
    }
}