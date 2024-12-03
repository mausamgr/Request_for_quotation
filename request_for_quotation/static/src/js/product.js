odoo.define('request_for_quotation.product_suggestions', function(require) {
    "use strict";

    const PublicWidget = require('website.public.widget');
    const rpc = require('web.rpc');

    return PublicWidget.Widget.extend({
        selector: '.product-suggestions-container',
        events: {
            'input #productSearch': '_onSearchInput',
        },

        /**
         * Initialize the widget and fetch products
         */
        start: function() {
            this._super.apply(this, arguments);
            this.$productInput = this.$('#productSearch');
            this.$datalist = this.$('#productSuggestions');
            this._fetchProducts();
            return this;
        },

        /**
         * Fetch products from the API
         * @private
         */
        _fetchProducts: function() {
            rpc.query({
                    route: '/api/products',
                    params: {}
                }).then(this._populateDatalist.bind(this))
                .catch(this._handleFetchError.bind(this));
        },

        /**
         * Populate datalist with product and variant options
         * @param {Array} data - Product data from API
         * @private
         */
        _populateDatalist: function(data) {
            // Clear existing options
            this.$datalist.empty();

            data.forEach(product => {
                // Add main product option
                const productOption = $('<option>', {
                    value: product.product_name,
                    text: `${product.product_name} (Product)`
                });
                this.$datalist.append(productOption);

                // Add variant options
                product.variants.forEach(variant => {
                    const variantOption = $('<option>', {
                        value: variant.variant_name,
                        text: `${variant.variant_name} (${product.product_name})`
                    });
                    this.$datalist.append(variantOption);
                });
            });
        },

        /**
         * Handle search input and filtering
         * @param {Event} ev - Input event
         * @private
         */
        _onSearchInput: function(ev) {
            const searchTerm = $(ev.currentTarget).val().toLowerCase();
            this._filterProducts(searchTerm);
        },

        /**
         * Filter products based on search term
         * @param {string} searchTerm - Search input
         * @private
         */
        _filterProducts: function(searchTerm) {
            const $options = this.$datalist.find('option');
            $options.each(function() {
                const $option = $(this);
                const optionText = $option.text().toLowerCase();
                $option.toggle(optionText.includes(searchTerm));
            });
        },

        /**
         * Handle API fetch errors
         * @param {Error} error - Fetch error
         * @private
         */
        _handleFetchError: function(error) {
            console.error('Error fetching products:', error);
            // Optional: Show user-friendly error message
            this.$datalist.append(
                $('<option>', {
                    value: '',
                    text: 'Error loading products',
                    disabled: true
                })
            );
        }
    });
});