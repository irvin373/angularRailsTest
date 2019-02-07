class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  belongs_to :role
  has_many :sell
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create do
    usuario = User.first 
    if usuario.nil? 
      self.role_id = 2
    else
      self.role_id = 3
    end
  end

  def rolename
  	self.role.name
  end

  def admin?
      if self.role_id == 2
          true
      else
          false
      end
  end

  def to_builder
    Jbuilder.new do |user|
      user.(self, :rolename)
    end
  end
end
