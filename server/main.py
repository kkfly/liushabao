#encoding:utf-8
from flask import Flask,request
from flask import render_template
#from flask.ext.sqlalchemy import SQLAlchem
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#返回一个渲染的html
@app.route('/user',methods=['GET', 'POST'])
def hi(name=None):
	return render_template('user_rel.html')

if __name__ == '__main__':
    app.run()