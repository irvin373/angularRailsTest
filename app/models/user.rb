class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  belongs_to :role
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_save do
    usuario = User.first 
    if usuario.nil? 
      self.role_id = 2
    else
      self.role_id = 1
    end
  end

  def rolename
  	self.role.name
  end

  def to_builder
    Jbuilder.new do |user|
      user.(self, :rolename)
    end
  end
end
