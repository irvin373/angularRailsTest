# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Company.create( line: 'alcos')
Product.create(code: '123ACD', comercialname: 'ampicilina', genericname: 'duclonfenato 5', unitprice: 1.2, company_id: 1)
Product.create(code: '143ADD', comercialname: 'diclofenato', genericname: 'hidrogeno', unitprice: 2, company_id: 1)
Atq.create( detail: 'anti inflamatorio')
Have.create(atq_id: 1, product_id: 1)
Help.create(detail: 'alivia dolor')
Helpwith.create(product_id: 1, help_id: 1)
Sell.create( ci: '123AW', total: 70.5, date_sell: Time.now.to_date)
Detail.create(sell_id: 1, product_id: 1, quantity: 3, promo: 1.2, sellpromo: false)
Detail.create(sell_id: 1, product_id: 2, quantity: 5, promo: 1.5, sellpromo: true)
Lot.create( product_id: 1, date_in: Time.now.to_date, date_expiration: Time.now.to_date, cost_in: 20, quantity_lot: 10, available: true)
Lot.create( product_id: 1, date_in: Time.now.to_date, date_expiration: Time.now.to_date, cost_in: 100, quantity_lot: 50, available: true)
Lot.create( product_id: 2, date_in: Time.now.to_date, date_expiration: Time.now.to_date, cost_in: 200, quantity_lot: 200, available: true)
