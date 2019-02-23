class Ability
  include CanCan::Ability

  def initialize(user)
      if user.present?
          if user.admin?
              can :manage_user, :all
              can :edit_product, :all
              can :delete_product, :all
              can :edit_lot, :all
              can :delete_lot, :all 
              can :edit_sell, :all 
              can :delete_sell, :all 
              can :edit_atq, :all
              can :delete_atq, :all
              can :view_pharmacy, :all
              can :change_pharmacy, :all
          else
              can :change_pharmacy, :all
          end
      end
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end	
end
