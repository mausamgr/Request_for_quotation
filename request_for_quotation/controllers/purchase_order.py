from odoo import http
from odoo.http import Response, request


class ProductAPIController(http.Controller):
    
    @http.route('/api/products', type='json', auth='public', methods=['GET'])
    def get_products(self):
        products = request.env['product.template'].search([])
        result = []
        for product in products:
            variants = []
            
            result.append({
                'product_id': product.id,
                'product_name': product.name,
                'category': product.categ_id.name,
                # 'unit':product.uom_id.name,
                'variants': variants,
                

            })
            
            
            for variant in product.product_variant_ids:
                variants.append({
                    'variant_id': variant.id,
                    'variant_name': variant.display_name,
                    'price': variant.list_price,
                })
        return result
    

