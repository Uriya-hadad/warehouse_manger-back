<h1>Warehouse management site</h1>
<p>This is the backend for the Warehouse management project, you can find 
the frontend and additional info in this link: <a href="https://github.
com/Uriya-hadad/warehouse_manger-front">frontend 
repo</a></p>
<h2>Public API</h2>
<p>in addition there is a public API"</p>

<table>
<tr>
    <th>Return Values </th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of the product</td>
    <td>String</td>
  </tr>
<tr>
    <td>status</td>
    <td>"Available" - The product is available in the warehouse.<br>"Sold 
Out" - The product is currently unavailable in the warehouse.</td>
    <td>String</td>
  </tr>
  <tr>
    <td>message</td>
    <td>Providing a message in case of an error.</td>
    <td>String</td>
  </tr>
</table>
<br>

```js
`query{
    productStatus(name:${nameofproduct}){
        name
        status
        message
    }
}`
```

<p>live: <a href="https://warehouse-staff.herokuapp.com/">https://warehouse-staff.herokuapp.com/</a></p>
<p>(The site is working as of 03/06/22)</p>