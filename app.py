from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ferramentas.db'
db = SQLAlchemy(app)

class Ferramenta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(100), nullable=False)
    fabricante = db.Column(db.String(100), nullable=False)
    data_aquisicao = db.Column(db.Date, nullable=False)
    data_ultima_calibracao = db.Column(db.Date, nullable=False)
    data_proxima_calibracao = db.Column(db.Date, nullable=False)
    garantia = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    ferramentas = Ferramenta.query.all()
    return render_template('index.html', ferramentas=ferramentas)

@app.route('/add_tool', methods=['POST'])
def add_tool():
    tipo = request.form['tipo']
    fabricante = request.form['fabricante']
    data_aquisicao = datetime.strptime(request.form['data_aquisicao'], '%Y-%m-%d')
    data_ultima_calibracao = datetime.strptime(request.form['data_ultima_calibracao'], '%Y-%m-%d')
    data_proxima_calibracao = datetime.strptime(request.form['data_proxima_calibracao'], '%Y-%m-%d')
    garantia = request.form['garantia']

    nova_ferramenta = Ferramenta(
        tipo=tipo,
        fabricante=fabricante,
        data_aquisicao=data_aquisicao,
        data_ultima_calibracao=data_ultima_calibracao,
        data_proxima_calibracao=data_proxima_calibracao,
        garantia=garantia
    )

    db.session.add(nova_ferramenta)
    db.session.commit()

    return redirect(url_for('index'))

@app.route('/consult_tool/<int:id>')
def consult_tool(id):
    ferramenta = Ferramenta.query.get(id)
    return render_template('consult_tool.html', ferramenta=ferramenta)

@app.route('/delete_tool/<int:id>')
def delete_tool(id):
    ferramenta = Ferramenta.query.get(id)
    db.session.delete(ferramenta)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/search_tool', methods=['GET'])
def search_tool():
    tool_id = request.args.get('id')
    ferramenta = Ferramenta.query.get(tool_id)
    if ferramenta:
        return render_template('tool_details.html', ferramenta=ferramenta)
    else:
        return render_template('tool_not_found.html', tool_id=tool_id)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
