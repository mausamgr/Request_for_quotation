from odoo import http
from odoo.http import request


class PurchaseRequestPortal(http.Controller):

    @http.route('/purchase/new_request', type='http', auth='user', website=True)
    def new_request_form(self):
        return request.render('request_for_quotation.view_new_request_form')


