from odoo import fields, models


class PurchaseRequest(models.Model):
    _name = 'purchase.request'
    _description = 'Purchase Request'

    name = fields.Char(string="Request Name", required=True)
    address = fields.Text(string="Address", required=True)
