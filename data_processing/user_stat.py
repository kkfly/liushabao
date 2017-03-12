name = "eliteraspberrie"
f_open = open("out.txt","r")
lines = f_open.readlines();
parent = {}
for line in lines:
	ids = line.split(' ')
	parent[ids[0]] = ids[1][:-1]
count_comment = {}
story = {}
story_set = set([])
for i in range(0,32):
	print i
	f = open("ids"+str(i)+".txt","r")
	lines = f.readlines()
	for line in lines:
		ids = line.split(' ')
		if ids[2][:-1] == name:
			story_set.add(parent[ids[0]])
	f.close()
dic = {}
for i in range(0,32):
	print i
	f = open("ids"+str(i)+".txt","r")
	lines = f.readlines()
	for line in lines:
		ids = line.split(' ')
		if parent[ids[0]] in story_set:
			if dic.has_key(ids[2][:-1]):
				dic[ids[2][:-1]] = dic[ids[2][:-1]] + 1
			else:
				dic[ids[2][:-1]] = 1
	f.close()
count_list = sorted(dic.items(), lambda x, y: cmp(x[1], y[1]), reverse=True)
f_out = open("les-miserables-user.gexf","w")
f_out.writelines("<nodes>\n")
for index,item in enumerate(count_list):
	if item[1] == 1:
		continue
	f_out.writelines("			<node id=\""+str(index)+"\" lable=\""+item[0]+"\">\n")
	f_out.writelines("				<attvalues>\n")
	value = 1
	if item[1] == 222:
		value = 9
		size = 100
	elif item[1] > 200:
		value = 8
		size = 80
	elif item[1] > 60:
		value = 7
		size = item[1]
	elif item[1] > 50:
		value = 6
		size = item[1]
	elif item[1] >40:
		value = 5
		size = item[1]
	elif item[1] > 30:
		value = 4
		size = item[1]
	elif item[1] > 20:
		value = 3
		size = item[1]
	elif item[1] > 10:
		value = 2
		size = item[1]
	elif item[1] > 5:
		value = 1
		size = item[1]
	else:
		value = 0
		size = item[1]

	f_out.writelines("					<attvalues for=\"modularity_class\" value=\""+str(value)+"\"></attvalues>\n")
	f_out.writelines("				</attvalues>\n")
	f_out.writelines("				<viz:size value=\""+str(size)+"\"></viz:size>\n")
	f_out.writelines("				<viz:position x=\"-418.08344\" y=\"446.8853\" z=\"0.0\"></viz:position>\n")
	f_out.writelines("				<viz:color r=\"236\" g=\"81\" b=\"72\"></viz:color>\n")
	f_out.writelines("			</node>\n")
f_out.writelines("		</nodes>\n")
f_out.writelines("		<edges>\n")
for index,item in enumerate(count_list):
	if (item[0] == name):
		continue
	if item[1] == 1:
		continue

	value = 1
	if item[1] == 222:
		value = 9
		size = 100
	elif item[1] > 200:
		value = 8
		size = 80
	elif item[1] > 60:
		value = 7
		size = item[1]
	elif item[1] > 50:
		value = 6
		size = item[1]
	elif item[1] >40:
		value = 5
		size = item[1]
	elif item[1] > 30:
		value = 4
		size = item[1]
	elif item[1] > 20:
		value = 3
		size = item[1]
	elif item[1] > 10:
		value = 2
		size = item[1]
	elif item[1] > 5:
		value = 1
		size = item[1]
	else:
		value = 0
		size = item[1]
	f_out.writelines("			<edge id=\""+str(index)+"\" source=\"0\" target=\""+str(index)+"\" weight=\""+str(value)+"\">\n")
	f_out.writelines("				<attvalues></attvalues>\n")
	f_out.writelines("			</edge>\n")
f_out.writelines("		</edges>\n")
#for key in dic.keys():
#	f_out.writelines(key+" "+str(dic[key])+"\n")

#for item in count_list:
#	f_out.writelines(item[0]+" "+str(item[1])+"\n")

f_out.close()
		
