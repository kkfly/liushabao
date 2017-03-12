import json
def findParent(now,parent):
	if parent.has_key(now):
		parent[now] = findParent(parent[now],parent)
		return parent[now]
	else:
		return now
parent = {}
for i in range(0,32):
	print i
	f = open("ids"+str(i)+".txt")
	lines = f.readlines()
	for line in lines:
		ids = line.split(" ")
		parent[ids[0]] = ids[1][:-1]
	f.close()

for key in parent.keys():
	print key
	if parent.has_key(parent[key]):
		parent[key] = findParent(parent[key],parent)
	else:
		pass

print len(parent.keys())
f_out = open("out.txt","w")
for key in parent.keys():
	f_out.writelines(key+" "+parent[key]+"\n")
f_out.close()

