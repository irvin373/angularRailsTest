script
rails new pruebas --database=postgresql
cd pruebas
rails g scaffold user_story name:string description:text priority:integer complexity:integer
rails g scaffold criterion_of_aceptation description:string user_story:references
rails g scaffold task name:string hour_stemate:integer state:string user_story:references
rails g scaffold sprint name:string date_init:date date_end:date
rails g model asign task:references sprint:references
rails g scaffold user ci:string name:string lastname:string user:string password:string
rails g model asign_task task:references user:references date_asign:date
rails g scaffold type_meeting type_meeting:string
rails g scaffold meeting date_meeting:date duration:integer type_meeting:references
rails g scaffold participate user:references meeting:references
rails g model participate user:references meeting:references
