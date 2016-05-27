# angularRailsTest
Prueba de asincronia de angular con ruby on rails


para clonar el proyecto recuerda:

*la base de datos esta en postgres con pguser y pass: CatetO37 *para crearla con el siguiente comando “rake db:create” *para instalar todas las dependencias es “bundle install”

*ahora el error de secret key base mising “rake secret” generara una llave para hacer los cambios se modifican en “~/config/initializers/devise.rb” => config.secret_key = “la clave generada por rake secret”

rails generate angular_csrf