from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = '115da4eac11df6b3da030f18a8dcdfeb'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///collection.db'
db = SQLAlchemy(app)

from flaskapp import routes
