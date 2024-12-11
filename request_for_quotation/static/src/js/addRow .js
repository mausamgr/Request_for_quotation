/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import VariantMixin from "@website_sale/js/sale_variant_mixin";
import { rpc } from "@web/core/network/rpc";

const addMore = publicWidget.Widget.extend(VariantMixin, {
  selector: "#sm_new_request_form",

  events: {
    "click #addMore": "_onClickAddMore", // Event binding for Add More button
    "change #productSelect": "_onProductChange",
    "input #productSelect": "_onProductSearch",
  },
  data: [],
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
      const res = await rpc("/api/products");
      this.data = res.data;
      // console.log(data,'data......')
    } catch (error) {
      console.log("Error rendering content", error);
    }
  },

  _onProductChange(ev) {
    const select = ev.currentTarget; // The select element
    // console.log(select,'product selected ....')
    const selectedProductId = select.value;
    // console.log(selectedProductId,'this is selected ')
    console.log(this.data, "this is change data");

    const selectedProduct = this.data.find(
      (product) => product.product_id == selectedProductId
    );
    // console.log(selectedProduct,'whene......')

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

  _onProductSearch() {},

  _onClickAddMore(ev) {
    ev.preventDefault(); 
    const tableBody = this.el.querySelector("#productTableBody");
    // const selectedProduct = this.data[0];

    const selectedProductId = productSelect.value;

    const productData = this.data;
    const setData = localStorage.setItem("addedProducts", JSON.stringify(productData))
    console.log(setData,'setData........')

    let selectedProduct = JSON.parse(localStorage.getItem("addedProducts"))
    console.log(selectedProduct,'selected product......')

    // Find the selected product from this.data
    selectedProduct = this.data.find(
        (product) => product.product_id == selectedProductId
    );

    // const selectedProduct =  JSON.parse(localStorage.getItem("addedProducts"))

    if(selectedProduct){

   
    

    // const savedData = JSON.parse(localStorage.getItem("addedProducts"))
    // console.log(savedData,'saved data /....')

    // console.log(selectedProduct,'selectd product ')

    

    const staticQuantity = 0;
    // console.log(selectedProduct, "selceted product iin addmore");
 
    const newRow = document.createElement("tr");

   

    newRow.innerHTML = `
             <td>
             <input type="text" name="product_name" class="product-name form-control " value="${selectedProduct.product_name}" readonly="readonly" />
             </td>
            <td><input type="number" name="product_qty" class="product-qty form-control " placeholder="Enter quantity" value="${staticQuantity}" readonly="readonly"/></td>
            <td><input type="text" name="product_package" class="fproduct-package form-control " placeholder="Enter package" value="${selectedProduct.package}" readonly="readonly"/></td>
            <td><input type="text" name="product_unit" class="product-unit form-control"  placeholder="Enter unit"value="${selectedProduct.unit}" readonly="readonly"/></td>
            <td><button type="button" class="btn btn-danger btn-remove">Remove</button></td>
        `;
    // }
    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // this._saveDataToLocalStorage(selectedProduct);
    // this._saveDataToLocalStorage();
    // Add event listener for the Remove button
    const removeButtons = tableBody.querySelectorAll(".btn-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        button.closest("tr").remove(); // Remove the corresponding row
      });
    });
}

    // console.log("New row added");
  },
    _saveDataToLocalStorage(){
      // console.log(selectedProduct,'selected product ')
      console.log("save data to local storage .....")
      const tableRows = this.el.querySelectorAll('#productTableBody tr')
      console.log(tableRows,'table rows...')
      const rowData = [];
      tableRows.forEach((row) => {
          const productName = row.querySelector(".product-name").value;
          const quantity = row.querySelector(".product-qty").value;
          const packag = row.querySelector(".product-package").value;
          const unit = row.querySelector(".product-unit").value;

          rowData.push({
              productName,
              quantity,
              packag,
              unit,
              // selectedProduct
          })
      })

      localStorage.setItem("addedProducts",JSON.stringify(rowData));

    },


});

publicWidget.registry.add_more = addMore;

export default addMore;
