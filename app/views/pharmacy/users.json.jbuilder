json.array!(@users) do |user|
  if user.role_id
  	json.extract! user, :id, :email, :rolename
  else
  	json.extract! user, :id, :email
  end
end