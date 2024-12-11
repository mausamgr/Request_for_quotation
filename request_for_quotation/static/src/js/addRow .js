/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import VariantMixin from "@website_sale/js/sale_variant_mixin";
import { rpc } from "@web/core/network/rpc";

const addMore = publicWidget.Widget.extend(VariantMixin, {
  selector: "#sm_new_request_form",

  events: {
    "click #addMore": "_onClickAddMore", // Event binding for Add More button
    "change #productSelect":"_onProductChange",
  },

  init() {
    this._super(...arguments);
    // this.rpc = this.bindService("rpc");
    this.data = [];
  },

  async start() {
    await this._super.apply(this, arguments);
    this._renderContent(); 
  },

  async _renderContent() {
    // console.log("render content .......")
    // console.log(await rpc("/api/products"));
    try {
        const data = await rpc("/api/products")
        // console.log(data,'dataaaao of api product...')
    }catch(error){
        console.log("Error rendering content", error);
    }
},



async _onProductChange(ev) {
    const select = ev.currentTarget; // The select element
    console.log(select,'product selected ....')
    const selectedProductId = select.value;

    // Find the selected product details
    const selectedProduct = data.find(
      (product) => product.id == selectedProductId
    );

    if (selectedProduct) {
      // Find the parent row of the select
      const row = select.closest("tr");

      // Update package and unit fields
      const packageInput = row.querySelector(".product-package");
      const unitInput = row.querySelector(".product-unit");

      packageInput.value = selectedProduct.package || ""; // Set package
      unitInput.value = selectedProduct.unit || ""; // Set unit
    }
  },

  _onClickAddMore(ev) {
    ev.preventDefault(); // Prevent the default form behavior

    // Find the table body where new rows will be appended
    const tableBody = this.el.querySelector("#productTableBody");

    // Create a new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>
                <select name="product" class="form-control product-select">
                    <option value="" disabled selected>Select a product</option>
                    <t t-foreach="products" t-as="product">
                        <option t-att-value="product.id">
                            <t t-esc="product.name"/>
                        </option>
                    </t>
                </select>
            </td>
            <td><input type="number" name="product_qty" class="form-control product-qty" placeholder="Enter quantity"/></td>
            <td><input type="text" name="product_package" class="form-control product-package" placeholder="Enter package"/></td>
            <td><input type="text" name="product_unit" class="form-control product-unit" placeholder="Enter unit"  t-att-value="data.unit"/></td>
            <td><button type="button" class="btn btn-danger btn-remove">Remove</button></td>
        `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Add event listener for the Remove button
    const removeButtons = tableBody.querySelectorAll(".btn-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        button.closest("tr").remove(); // Remove the corresponding row
      });
    });

    // console.log("New row added");
  },
});

publicWidget.registry.add_more = addMore;

export default addMore;
