from flask import Flask, redirect, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='templates')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://localhost/FerramentasDB?driver=ODBC+Driver+17+for+SQL+Server&auth=Windows'

db = SQLAlchemy(app)

class Ferramentas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    manufacturer = db.Column(db.String(50), nullable=False)
    acquisitionDate = db.Column(db.Date, nullable=False)
    lastCalibrationDate = db.Column(db.Date, nullable=False)
    nextCalibrationDate = db.Column(db.Date, nullable=False)
    warranty = db.Column(db.String(50), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    tools = Ferramentas.query.all()
    return render_template('/index.html', tools=tools)

@app.route('/add_tool', methods=['POST'])
def add_tool():
    new_tool = Ferramentas(id='ID', type='Ferramenta Nova', manufacturer='Fabricante Novo', acquisitionDate='Data de Aquisicao', lastCalibrationDate='Data da ultima calibracao', nextCalibrationDate='Data da proxima calibracao', warranty='Garantia')

    db.session.add(new_tool)
    db.session.commit()

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)

import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.event import listens_for

db = SQLAlchemy(app)

@listens_for(Ferramentas, 'after_insert')
def receive_after_insert(mapper, connection, target):
    app.logger.info('Ferramenta inserida no banco de dados!')