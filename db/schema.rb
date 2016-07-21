# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160720153336) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "atqs", force: :cascade do |t|
    t.string   "detail"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string   "line"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comunicates", force: :cascade do |t|
    t.integer  "atq_id"
    t.integer  "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comunicates", ["atq_id"], name: "index_comunicates_on_atq_id", using: :btree
  add_index "comunicates", ["product_id"], name: "index_comunicates_on_product_id", using: :btree

  create_table "details", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "sell_id"
    t.integer  "quantity"
    t.float    "sellpromo"
    t.boolean  "promo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "details", ["product_id"], name: "index_details_on_product_id", using: :btree
  add_index "details", ["sell_id"], name: "index_details_on_sell_id", using: :btree

  create_table "helps", force: :cascade do |t|
    t.string   "detail"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "helpwiths", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "help_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "helpwiths", ["help_id"], name: "index_helpwiths_on_help_id", using: :btree
  add_index "helpwiths", ["product_id"], name: "index_helpwiths_on_product_id", using: :btree

  create_table "lots", force: :cascade do |t|
    t.integer  "product_id"
    t.date     "date_in"
    t.date     "date_expiration"
    t.float    "cost_in"
    t.integer  "quantity_lot"
    t.boolean  "available"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "percentage_gain"
  end

  add_index "lots", ["product_id"], name: "index_lots_on_product_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "code"
    t.string   "comercialname"
    t.string   "genericname"
    t.float    "unitprice"
    t.integer  "company_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "products", ["company_id"], name: "index_products_on_company_id", using: :btree

  create_table "sells", force: :cascade do |t|
    t.string   "ci"
    t.float    "total"
    t.date     "date_sell"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comunicates", "atqs"
  add_foreign_key "comunicates", "products"
  add_foreign_key "details", "products"
  add_foreign_key "details", "sells"
  add_foreign_key "helpwiths", "helps"
  add_foreign_key "helpwiths", "products"
  add_foreign_key "lots", "products"
  add_foreign_key "products", "companies"
end
