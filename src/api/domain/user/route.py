
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Roles
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.user.controller as Controller
import api.handle_response as Response

api = Blueprint('api/user', __name__)

@api.route('/worker', methods=['POST'])
def create_user():
        body = request.get_json()
        new_user = Controller.create_user(body)   
        if isinstance(new_user, User):   
            return Response.response_ok(new_user.serialize(), "Usuario registrado correctamente!", 201)
        return Response.response_error("Usuario no registrado!", 401)


   

      
      