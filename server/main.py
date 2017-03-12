#encoding:utf-8
from flask import Flask,request
from flask import render_template
import datetime
#from flask.ext.sqlalchemy import SQLAlchem
from flask_sqlalchemy import SQLAlchemy
import wikipedia
import json
from sqlalchemy.ext.declarative import DeclarativeMeta
class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data)     # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:    # 添加了对datetime的处理
                    if isinstance(data, datetime.datetime):
                        fields[field] = data.isoformat()
                    elif isinstance(data, datetime.date):
                        fields[field] = data.isoformat()
                    elif isinstance(data, datetime.timedelta):
                        fields[field] = (datetime.datetime.min + data).time().isoformat()
                    else:
                        fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)
#创建数据库
app = Flask(__name__)
app.config['SECRET_KEY'] ='hard to guess'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:pass123@localhost:3306/example' #这里登陆的是root用户，要填上自己的密码，MySQL的默认端口是3306，填上之前创建的数据库名text1
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True #设置这一项是每次请求结束后都会自动提交数据库中的变动
db = SQLAlchemy(app) #实例化

#数据库表model
class Comment(db.Model):
    __tablename__ = 'comments' #定义表名
    id = db.Column(db.String(64),primary_key=True)#定义列对象
    by = db.Column(db.String(64))
    story_id = db.Column(db.String(64))
    text = db.Column(db.Text)
    time = db.Column(db.DateTime)
    ranking = db.Column(db.Integer)
    def __repr__(self):
    	return '<Comment {}> '.format(self.id)
#数据库表model
class Story(db.Model):
    __tablename__ = 'stories' #定义表名
    id = db.Column(db.String(64),primary_key=True)#定义列对象
    by = db.Column(db.String(64))
    text = db.Column(db.Text)
    url = db.Column(db.Text)
    image_url = db.Column(db.Text)
    time = db.Column(db.DateTime)
    score = db.Column(db.Integer)
    type = db.Column(db.String(32))
    title = db.Column(db.Text)
    radio = db.Column(db.String(128))
    def __repr__(self):
    	return '<Story {}> '.format(self.id)
        '''
        return str({"id":self.id,
        "by":self.by,
        "text":self.text,
        "url":self.url,
        "image_url":self.image_url,
        "time":self.time,
        "score":self.score,
        "type":self.type,
        "title":self.title,
        "radio":self.radio})
'''

if __name__ == '__main__':
    db.create_all() #直接在hello.py文件中加，在python命令行下输入太麻烦


#返回首页列表
@app.route('/',methods=['GET', 'POST'])
def index():
    #stories = Story.query.filter_by(time != NULL).order_by("time").limit(30)
    stories = Story.query.filter_by().order_by("time desc").limit(30).all()
    #.order_by("time").limit("30")
    print stories
    return json.dumps(stories, cls=AlchemyEncoder)

#返回首页列表
@app.route('/hi',methods=['GET', 'POST'])
def hi():
    #stories = Story.query.filter_by(time != NULL).order_by("time").limit(30)
    ids = set(["2489601","6662566","7471378","8794836","9053854","10022518","10033763","10153219","10180621"]);
    story_list = []
    for items in ids:
        stories = Story.query.filter_by(id=items).first()
        story_list.append(stories)
    #.order_by("time").limit("30")
    print story_list

    return json.dumps(story_list, cls=AlchemyEncoder)

#返回推荐列表
@app.route('/recommend',methods=['GET', 'POST'])
def recommend():
    #stories = Story.query.filter_by(time != NULL).order_by("time").limit(30)
    ids = set(["2489601","6662566","7471378","8794836","9053854","10022518","10033763","10153219","10180621",'8258117', '10203205', '16495', '2323759']);
    story_list = []
    for items in ids:
        stories = Story.query.filter_by(id=items).first()
        story_list.append(json.dumps(stories, cls=AlchemyEncoder))
    #.order_by("time").limit("30")
    print story_list

    return json.dumps(story_list)

#返回评论列表
@app.route('/comments',methods=['GET', 'POST'])
def coments():
    #stories = Story.query.filter_by(time != NULL).order_by("time").limit(30)
    comments = Comment.query.filter_by().all()
    #.order_by("time").limit("30")
    #print stories
    return json.dumps(comments, cls=AlchemyEncoder)




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