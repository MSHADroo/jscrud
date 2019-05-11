# jscrud

this make project help you to implement crud cycle view as simple as possible;
you can create form , grid , modal and etc with json object

for example you can create a grid with this code:
```js
new Grid({
    id: 'grid-id',
    holder: 'grid-holder-on-page',
    ajax: 'https://jsonplaceholder.typicode.com/posts',
    columns: [
        { data: "userId"  , title: 'User ID' },
        { data: "id", title: 'ID' },
        { data: "title" , title: 'Title'},
        { data: "body" , title: 'Body'}
    ]
}).load();
```

```js
let form = new Form({
        id: 'search-form',
        holder: 'form-holder',
        columns: [[{
            type: 'select',
            id: 'product_type',
            title: 'Product Type',
            source: {
                data: [{id: 'class', name: 'Class'},{id: 'mock', name: 'Mock'},{id: 'exam', name: 'Exam'}],
                def: {value: 'id', title: 'name'},
            },
        }, {
            type: 'select',
            id: 'product_id',
            title: 'Products',
            source: {
                data: [{id: 'all', name: 'All'}],
                ajax: '/api/product/list',
                def: {value: 'id', title: 'name'},
            }
        }, {
            type: 'select',
            id: 'event_date',
            title: 'Events Date',
            source: {
                ajax: '/api/product/list',
                def: {value: 'id', title: 'name'},
            }
        }],[{
            type: 'date',
            id: 'event_start_date',
            title: 'Event Start Date From',
            hint: 'start date of event is bigger than this date'
        }, {
            type: 'date',
            id: 'event_end_date',
            title: 'Event Start Date to',
            hint: 'start date of event is smaller than this date'
        }]],
        actions: [{
            type: 'search',
            id: "form-search",
            title: 'Descriptional Report',
            action: "descReport",
            params: []
        },{
            type: 'search',
            id: "form-search",
            title: 'Statistical Report',
            action: "statReport",
            params: []
        }]
    });
    ```
