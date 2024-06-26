from flask import Flask, render_template, session, make_response, jsonify, request
from models import db, User
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS 
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

...

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 0
app.json.compact = 0
app.secret_key = b'\xff\x90\x07\x04g6\xfc\xfb\x9b\xba{3\xd6\xfc\xbd\x04'

api = Api(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/api/')
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
        for attr, value in data.items():  # Iterate over JSON data items
            setattr(user, attr, value)     # Set attribute value using setattr
        db.session.commit()
        return {'success': 'User updated successfully.'}, 200

    
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found.'}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    
api.add_resource(UserResource, '/api/users', '/api/users/<int:id>')

class Login(Resource):
 def post(self):
        user = User.query.filter(User.email == request.get_json()['email']).first()

        session['user_id'] = user.id
        return make_response(jsonify(user.to_dict()))
        
api.add_resource(Login, '/api/login')  

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {}, 401
            
api.add_resource(CheckSession, '/api/check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=1)

