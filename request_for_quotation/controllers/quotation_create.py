import json
from datetime import datetime

from odoo import http
from odoo.http import request


class RFQController(http.Controller):

    @http.route('/api/create_rfq', type='json', auth='public', methods=['POST'], csrf=False)
    def create_rfq(self, **kwargs):
        try:

            partner_id = kwargs.get('partner_id')
            date_order = kwargs.get('date_order')
            date_planned = kwargs.get('date_planned')
            products = kwargs.get('products')


            if not date_order:
                return {'error': 'Order date is required.'}
            if not date_planned:
                return {'error': 'Planned date is required.'}
            if not products:
                return {'error': 'Products are required.'}

            partner = (
                request.env['res.partner'].sudo().search([('id', '=', partner_id)], limit=1) or
                request.env['res.partner'].sudo().search([('name', '=', partner_id)], limit=1)
            )
            if not partner:
                return {'error': 'Partner not found.'}


            order_lines = []
            for product_data in products:
                product_id = product_data.get('product_id')
                product_qty = product_data.get('product_qty')
                product_uom = product_data.get('product_uom')


                product = (
                    request.env['product.product'].sudo().search([('id', '=', product_id)], limit=1) or
                    request.env['product.product'].sudo().search([('name', '=', product_id)], limit=1)
                )
                if not product:
                    return {'error': f"product not found: {product_id}"}

                uom = request.env['uom.uom'].sudo().search([('id', '=', product_uom ) or ('sudo().name', '='. product_uom)], limit=1)
                if not uom:
                    return {'error': f"unit of measure not found"}


                order_lines.append((0, 0, {
                    'product_id': product.id,
                    'product_qty': product_qty,
                    'product_uom': uom.id,
                    'date_planned': date_planned,
                    'price_unit': product.standard_price,
                }))


            purchase_order = request.env['purchase.order'].sudo().create({
                'partner_id': partner.id,
                'date_order': date_order,
                'order_line': order_lines,
            })

            return {'success': True, 'rfq_id': purchase_order.id}

        except Exception as e:
            return {'error': str(e)}
