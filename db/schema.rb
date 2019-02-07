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

ActiveRecord::Schema.define(version: 20190205134421) do

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
    t.integer  "pharmacy_id"
  end

  add_index "lots", ["pharmacy_id"], name: "index_lots_on_pharmacy_id", using: :btree
  add_index "lots", ["product_id"], name: "index_lots_on_product_id", using: :btree

  create_table "pharmacies", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string   "code"
    t.string   "comercialname"
    t.string   "genericname"
    t.float    "unitprice"
    t.integer  "company_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "presentation"
  end

  add_index "products", ["company_id"], name: "index_products_on_company_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "pharmacy_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "roles", ["pharmacy_id"], name: "index_roles_on_pharmacy_id", using: :btree

  create_table "sells", force: :cascade do |t|
    t.string   "ci"
    t.float    "total"
    t.date     "date_sell"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "pharmacy_id"
    t.integer  "user_id"
  end

  add_index "sells", ["pharmacy_id"], name: "index_sells_on_pharmacy_id", using: :btree
  add_index "sells", ["user_id"], name: "index_sells_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "role_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree

  add_foreign_key "comunicates", "atqs"
  add_foreign_key "comunicates", "products"
  add_foreign_key "details", "products"
  add_foreign_key "details", "sells"
  add_foreign_key "helpwiths", "helps"
  add_foreign_key "helpwiths", "products"
  add_foreign_key "lots", "pharmacies"
  add_foreign_key "lots", "products"
  add_foreign_key "products", "companies"
  add_foreign_key "roles", "pharmacies"
  add_foreign_key "sells", "pharmacies"
  add_foreign_key "sells", "users"
  add_foreign_key "users", "roles"
end
