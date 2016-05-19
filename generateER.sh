rails g model company line:string
rails g model product code:string comercialname:string genericname:string unitprice:float company:references
rails g model atq detail:string
rails g model help detail:string
rails g model sell ci:string total:float date_sell:date
rails g model comunicate atq:references product:references
rails g model helpwith product:references help:references
rails g model detail product:references sell:references quantity:integer sellpromo:float promo:boolean
rails g model lot product:references date_in:date date_expiration:date cost_in:float quantity_lot:integer available:boolean

rails g controller companies 
rails g controller products 
rails g controller atqs 
rails g controller helps
rails g controller sell 
rails g controller details
rails g controller lots