import os
import json
import mysql.connector
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
        f = open("out.txt", "r")
        i=0
        list=[]
        for line in f:
            strs = line.split(" ")
            data=(strs[0], strs[1].replace("\n",""))
            list.append(data)
            cursor=cnx.cursor()
            sql = "insert into (comment_id,story_id)values(%s,%s)"
            if i>5000:
                cursor.executemany(sql,list)
                cnx.commit()
                print("插入")
                i=0
                list.clear()
            i=i+1
        if i>0:
            cursor.executemany(sql,list)
            cnx.commit()
        cnx.close()
        f.close()
        print("ok")
    def listFiles(self):
        d = os.listdir("E:/data/")
        return d

            
if __name__ == "__main__":
    readFile = ReadFile()
    readFile.readLines()