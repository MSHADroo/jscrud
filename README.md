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
