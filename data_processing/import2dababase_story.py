#encoding:utf-8
import os
import json
import mysql.connector
import datetime
config = {
  'user': 'root',
  'password': 'pass123',
  'host': '127.0.0.1',
  'database': 'example',
  'raise_on_warnings': True,
}
cnx = mysql.connector.connect(**config)
class ReadFile:
    def readLines(self):
        f = open("mid1.txt", "r")
        i=0
        list=[]
        for line in f:
            story = json.loads(line[:-1])
            if not story.has_key("text"):
                story["text"] = ""
            if not story.has_key("url"):
                story["url"] = ""
            if not story.has_key("image_url"):
                story["image_url"] = ""
            if not story.has_key("time"):
                story["time"] = null
            if not story.has_key("score"):
                story["score"] = 0
            if not story.has_key("type"):
                story["type"] = ""
            if not story.has_key("title"):
                story["title"] = ""
            dateArray = datetime.datetime.utcfromtimestamp(int(str(story["time"])));
            otherStyleTime = dateArray.strftime("%Y-%m-%d %H:%M:%S")

            data=(str(story["id"]),str(story["by"]),str(story["text"]),str(story["url"]),str(story["image_url"]),otherStyleTime,str(story["score"]),str(story["type"]),str(story["title"]),"")
            #list.append(data)
            cursor=cnx.cursor()
            #sql = "insert into stories values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            sql = "insert into stories values" + str(data);
            #print sql;
            #print sql,data
            #if i>=0:
            print i
                #cursor.executemany(sql,list)
            cursor.execute(sql)

            cnx.commit()
            print("插入")
            #i=0
                #list.clear()
            i=i+1
        #if i>0:
        #    cursor.executemany(sql,list)
        #    cnx.commit()
        cnx.close()
        f.close()
        print("ok")
    def listFiles(self):
        d = os.listdir("E:/data/")
        return d

            
if __name__ == "__main__":
    readFile = ReadFile()
    readFile.readLines()