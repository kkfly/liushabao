#encoding:utf-8
from flask import Flask,request
from flask import render_template
#from flask.ext.sqlalchemy import SQLAlchem
from flask_sqlalchemy import SQLAlchemy
import wikipedia
import json

app = Flask(__name__)
#返回一个渲染的html
@app.route('/user',methods=['GET', 'POST'])
def hi(name=None):
	return render_template('user_rel.html')

@app.route('/getwiki', methods=['GET', 'POST'])
def getWiki():
	req = request.get_data()
	print req
	data = json.loads(req)
	try:
		result = wikipedia.summary(data['keywords'])
		return json.dumps({'result':result, 'success': True})
	except Exception, e:
		return json.dumps({'success': False})

if __name__ == '__main__':
    app.run()