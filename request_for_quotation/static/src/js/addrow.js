/** @odoo-module **/

$(function() {
    $('#add').click(function() {
        const newRow = `
            <div class="d-flex justify-content-between input-row mb-2">
            <div style="width: 28%;">
                <input 
                    type="text" 
                    name="product_id" 
                    class="form-control" 
                    placeholder="Enter product name" 
                    list="productSuggestions" 
                />
                <datalist id="productSuggestions">
                    <t t-foreach="request.env['product.template'].search([])" t-as="product">
                        <option t-att-value="product.name">
                            <t t-esc="product.name"/>
                        </option>
                    </t>
                </datalist>
            </div>
            <div style="width: 18%;">
                <input 
                    type="number" 
                    name="product_qty" 
                    class="form-control" 
                    placeholder="Enter quantity" 
                />
            </div>
            <div style="width: 20%;">
                <input 
                    type="number" 
                    name="package" 
                    class="form-control"    
                    placeholder="Enter A Package" 
                />
            </div>
            <div style="width: 15%;">
                <input 
                    type="number" 
                    name="unit" 
                    class="form-control" 
                    placeholder="Enter A Package" 
                />
            </div>
                <button type="button" class="btn btn-danger remove" style="width:10%">Remove</button>
            </div>
        `;
        $('#inputs').append(newRow);
    });
    $('#inputs').on('click', '.remove', function() {
        $(this).closest('.input-row').remove();
    });
});

// $(function() {
//     $('#add').click(function() {
//         $('#inputs').append('<label for="stop">Stop 1:</label> <input type="text" id="stop1" value=""><br />');
//     });
// });