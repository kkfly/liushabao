import json

f_open = open("out.txt","r")
lines = f_open.readlines();
parent = {}
for line in lines:
	ids = line.split(' ')
	parent[ids[0]] = ids[1][:-1]
count_comment = {}
story = {}
for i in range(0,32):
	print i
	f = open("ids"+str(i)+".txt","r")
	lines = f.readlines()
	for line in lines:
		ids = line.split(' ')
		if count_comment.has_key(ids[2][:-1]):
			count_comment[ids[2][:-1]] = count_comment[ids[2][:-1]] + 1
		else:
			count_comment[ids[2][:-1]] = 1
		if story.has_key(ids[2][:-1]):
			story[ids[2][:-1]].add(parent[ids[0]])
		else:
			story[ids[2][:-1]] = set([ids[0]])

count_list = sorted(count_comment.items(), lambda x, y: cmp(x[1], y[1]), reverse=True)
f_out = open("stat.txt","w")
#for key in count_comment.keys():
#	f_out.writelines(key+" "+str(count_comment[key])+" "+str(len(story[key]))+"\n")
for item in count_list:
	f_out.writelines(item[0]+" "+str(item[1])+" "+str(len(story[item[0]]))+"\n")

f_out.close()