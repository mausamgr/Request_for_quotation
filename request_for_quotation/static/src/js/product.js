console.log("================================")
    /** @odoo-module **/
    // odoo.define('request_for_quotation.product', function(require) {
    //     "use strict";

//     $(document).ready(function() {
//         async function fetchProducts() {
//             try {
//                 const response = await fetch('/api/products');
//                 const data = await response.json();

//                 if (data.status === 'success') {
//                     populateProductSuggestions(data.data);
//                 } else {
//                     console.error('Error fetching products:', data.message);
//                 }
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         }

//         function populateProductSuggestions(products) {
//             const datalist = $('#product_suggestions');
//             datalist.empty();

//             products.forEach(product => {
//                 const option = $('<option>')
//                     .val(product.product_name)
//                     .data('unit', product.unit);
//                 datalist.append(option);


//                 product.variants.forEach(variant => {
//                     const variantOption = $('<option>')
//                         .val(`${variant.variant_name} (Variant)`)
//                         .data('unit', product.unit);
//                     datalist.append(variantOption);
//                 });
//             });
//         }

//         $('#product_input').on('input', function() {
//             const inputVal = $(this).val();
//             const selectedOption = $('#product_suggestions option').filter(function() {
//                 return $(this).val() === inputVal;
//             });

//             if (selectedOption.length > 0) {
//                 $('#unit_box').val(selectedOption.data('unit') || 'N/A');
//             } else {
//                 $('#unit_box').val('');
//             }
//         });

//         fetchProducts();
//     });
// });