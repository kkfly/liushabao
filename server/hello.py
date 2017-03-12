#encoding:utf-8
from flask import Flask,request
from flask import render_template
#from flask.ext.sqlalchemy import SQLAlchem
from flask_sqlalchemy import SQLAlchemy

#创建数据库
app = Flask(__name__)
app.config['SECRET_KEY'] ='hard to guess'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:pass123@localhost:3306/example' #这里登陆的是root用户，要填上自己的密码，MySQL的默认端口是3306，填上之前创建的数据库名text1
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True #设置这一项是每次请求结束后都会自动提交数据库中的变动
db = SQLAlchemy(app) #实例化

#数据库表model
class Role(db.Model):
    __tablename__ = 'roles' #定义表名
    id = db.Column(db.Integer,primary_key=True)#定义列对象
    name = db.Column(db.String(64),unique=True)
    user = db.relationship('User',backref='role',lazy='dynamic')#建立两表之间的关系，其中backref是定义反向关系，lazy是禁止自动执行查询（什么鬼？）
    def __repr__(self):
    	return '<Role {}> '.format(self.name)

class User(db.Model):
 	__tablename__ = 'users'
 	id = db.Column(db.Integer,primary_key = True)
 	username = db.Column(db.String(64),unique=True,index=True)
 	role_id = db.Column(db.Integer,db.ForeignKey('roles.id'))
 	def __repr__(self):
 		return '<User {}>'.format(self.username)

if __name__ == '__main__':
    db.create_all() #直接在hello.py文件中加，在python命令行下输入太麻烦

@app.route('/')
def hello_world():
	#向数据库表中插入数据
	admin_role =Role(name = 'Admin') #实例化
	mod_role = Role(name = 'Moderator')
	user_role =Role(name = 'User')
	user_john = User(username = 'john',role=admin_role)#role属性也可使用，虽然他不是真正的数据库列，但却是一对多关系的高级表示
	user_susan = User(username = 'susan',role= user_role)
	user_david = User(username = 'david',role = user_role)
	db.session.add_all([admin_role,mod_role,user_role,user_john,user_susan,user_david])  # 准备把对象写入数据库之前，先要将其添加到会话中，数据库会话db.session和Flask session对象没有关系，数据库会话也称事物
	db.session.commit()#提交会话到数据库

	return 'Hello World!'
#get获得参数，返回一个json格式的数据
@app.route('/haha',methods=['GET', 'POST'])
def haha_world():
	if ( request.method == 'GET'):
		print request.args.get('abc')
		return app.response_class(request.args.get('abc'), content_type='application/json')
#路径中获得参数
@app.route('/hehe/<name>',methods=['GET', 'POST'])
def hehe_world(name=None):
	print name
	return 'haha World!'

#返回一个渲染的html
@app.route('/hi/<name>',methods=['GET', 'POST'])
def hi(name=None):
	print name
	#从数据库表中提取username=name的所有的数据
	user = User.query.filter_by(username=name).all()
	#从数据库表中提取username=name的第一条的数据
	#user = User.query.filter_by(username=name).first()
	print user
	return render_template('hi.html', user=user)
#post获得参数
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'],
                       request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('login.html', error=error)
if __name__ == '__main__':
    app.run()
