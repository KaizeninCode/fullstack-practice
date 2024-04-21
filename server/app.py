from flask import Flask, session, make_response, jsonify, request
from models import db, User
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS 
import os

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 0
secret_key = b'\xff\x90\x07\x04g6\xfc\xfb\x9b\xba{3\xd6\xfc\xbd\x04'

api = Api(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return '<h1>SAMPLE API</h1>'

class UserResource(Resource):
    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if not user:
                return {'error': 'User not found.'}, 404
            return make_response(jsonify(user.to_dict())), 200
        else:
            users = User.query.all()
            if not users:
                return {'error': 'There are no users to display.'}, 400
            return make_response(jsonify([u.to_dict() for u in users]), 200)
        
    def post(self):
        data = request.get_json()
        new_user = User(
            name = data['name'],
            email = data['email']
        )    

        db.session.add(new_user)
        db.session.commit()
        return {'success': 'User created successfully'}, 201
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found.'}, 404
        data = request.json
        for attr in request.form():
            setattr(user, attr, request.form['attr'])
        db.session.commit()
        return {'success': 'Customer updated successfully.'}, 200
    
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found.'}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    
api.add_resource(UserResource, '/users', '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=1)

