#encoding:utf-8
from flask import Flask,request
from flask import render_template
#from flask.ext.sqlalchemy import SQLAlchem
from flask_sqlalchemy import SQLAlchemy
import wikipedia
import json
#创建数据库
app = Flask(__name__)
app.config['SECRET_KEY'] ='hard to guess'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:pass123@localhost:3306/example' #这里登陆的是root用户，要填上自己的密码，MySQL的默认端口是3306，填上之前创建的数据库名text1
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True #设置这一项是每次请求结束后都会自动提交数据库中的变动
db = SQLAlchemy(app) #实例化

#数据库表model
class Comment(db.Model):
    __tablename__ = 'comments' #定义表名
    id = db.Column(db.Integer,primary_key=True)#定义列对象
    by = db.Column(db.String(64))
    story_id = db.Column(db.String(64))
    text = db.Column(db.Text)
    time = db.Column(db.Date)
    deleted = db.Column(db.Boolean)
    ranking = db.Column(db.Integer)
    def __repr__(self):
    	return '<Comment {}> '.format(self.name)
#数据库表model
class Story(db.Model):
    __tablename__ = 'stories' #定义表名
    id = db.Column(db.Integer,primary_key=True)#定义列对象
    by = db.Column(db.String(64))
    text = db.Column(db.Text)
    url = db.Column(db.Text)
    image_url = db.Column(db.Text)
    time = db.Column(db.Date)
    score = db.Column(db.Integer)
    type = db.Column(db.String(32))
    title = db.Column(db.Text)
    dead = db.Column(db.Boolean)
    radio = db.Column(db.String(128))
    def __repr__(self):
    	return '<Story {}> '.format(self.name)

if __name__ == '__main__':
    db.create_all() #直接在hello.py文件中加，在python命令行下输入太麻烦

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
		url = wikipedia.page(data['keywords']).url
		return json.dumps({'result':result, 'url':url, 'success': True})
	except Exception, e:
		return json.dumps({'success': False})

if __name__ == '__main__':
    app.run()