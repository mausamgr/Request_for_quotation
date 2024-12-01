{
    'name': 'request for quotation',
    'version': '18.0.1.0.0',
    'category': 'Tools',
    'summary': 'Generate QR codes for partners',
    'description': """
    """,
    'author': 'Name',
    'website': 'https://www.yourwebsite.com',
    'license': 'LGPL-3',
    'depends': ['base','account','product'],
    'data': [
        'views/order.xml',
        'views/rfq_form.xml'
    ],
        'assets': {
            'web.assets_frontend':[
                'request_for_quotation/static/src/css/style.css',
                # 'request_for_quotation/static/src/js/product.js',
                'request_for_quotation/static/src/js/addrow.js',
                ],
        },

    # 'assets': {
    #     'web.assets_backend': [
    #         'request_for_quotation/static/src/js/addrow.js',
    #     ],
    # },




    'demo': [],
    'installable': True,
    'application': False,
    'auto_install': False,
}