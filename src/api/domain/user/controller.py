import api.domain.user.repository as Repository
import api.handle_response as Response
import bcrypt
from api.functions import hash_pass, find_role, verify_user, verify_login
from flask_jwt_extended import create_access_token # PARA PODER CREAR EL TOKEN


def get_users():
    response = Repository.get_users()
    return Response.response_ok(response, "Todos los usuarios", 201)


def create_user(new_user):
   correct_user = verify_user(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email']) 

  
def create_user_by_role(new_user, roles_id):
   correct_user = verify_user(new_user)
   if correct_user.get("error") is not None:
      return correct_user
   hashed = hash_pass(new_user['password']) 
   return Repository.create_user_by_role(new_user['user_name'],hashed.decode(),new_user['name'],new_user['last_name'],new_user['email'], roles_id)  

def login_users(user):
   correct_user = verify_login(user)
   if correct_user.get('error') is not None:
      return correct_user
   login_user = Repository.get_user_private(user['email'])
   if login_user is None :
      return Response.response_error("El email no existe", 400)
   if bcrypt.checkpw(user['password'].encode(), login_user.password.encode()):    # si la contraseña coincide con lo que le pasamos devuelve el token 
      access_token = create_access_token(identity = login_user.serialize())
      return {"token": access_token}
   return Response.response_error("Datos de acceso incorrectos", 404) # si la contraseña no es correcta devuelve este mensaje



def get_user_private(user):
    user = Repository.get_user_private(user['email'])
    if user is None :
      return Response.response_error("El usuario no existe", 404)
    return user


def get_single_user(id):
      
    resultado = Repository.get_single_user(id)
    if resultado is not None:
        return resultado
    else:
        return Response.response_error("No se encuentra", 404)

def edit_user(user_id,info):
   user = get_single_user(user_id)
   if user is None:
      return None
   edit = Repository.edit_user(user, info)
   return edit
 
def check_worker(data):
   return Repository.check_worker(data['user_name'], data['email'])
  
def check_lawyer(data):
   return Repository.check_lawyer(data['email'], data['col_number'])

def check_company(data):
   return Repository.check_company(data['email'], data['cif'])