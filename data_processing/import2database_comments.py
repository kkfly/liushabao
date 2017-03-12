#encoding:utf-8
import os
import json
import datetime
import mysql.connector
config = {
  'user': 'root',
  'password': 'pass123',
  'host': '127.0.0.1',
  'database': 'example',
  'raise_on_warnings': True,
}
f = open("mid1.txt", "r")
stories = set([])
for line in f:
	story = json.loads(line[:-1])
	#print story["id"]
	stories.add(story["id"])

f.close()
f = open("out.txt", "r")
lines = f.readlines()
parent = {}
for line in lines:
	ids = line.split(" ")
	#print ids[1][:-1]
	if ( ids[1][:-1] in stories):
		parent[ids[0]] = ids[1][:-1]
		#print ids[0]
cnx = mysql.connector.connect(**config)
print len(parent)

class ReadFile:
    def readLines(self,path):
    	f_open = open(path,"r")
        i=0
        for line in f_open:
            comments = json.loads(line[:-1])
            #print str(comments["id"])
            if parent.has_key(comments["id"]):
            	if not comments.has_key("text"):
                	comments["text"] = ""
                if not comments.has_key("by"):
                	comments["by"] = ""
                if not comments.has_key("time"):
                	comments["time"] = null
                if not comments.has_key("ranking"):
                	comments["ranking"] = 0
                print str(comments["id"])
                dateArray = datetime.datetime.fromtimestamp(int(str(comments["time"])));
                otherStyleTime = dateArray.strftime("%Y-%m-%d %H:%M:%S")
                print otherStyleTime
            	data=(str(comments["id"]),str(comments["by"]),str(parent[comments["id"]]),str(comments["text"]),otherStyleTime,str(comments["ranking"]))
            	cursor=cnx.cursor()
            	sql = "insert into comments values "+str(data);
                cursor.execute(sql)
                cnx.commit()
                print("插入")
            	i=i+1
        f_open.close()
        print("ok")
    def listFiles(self):
        d = os.listdir("E:/data/")
        return d

            
if __name__ == "__main__":
    readFile = ReadFile()
    for i in range(0,10):
    	readFile.readLines("/Users/zoezhou/Downloads/comments_00000000000"+str(i))
    cnx.close()
    







