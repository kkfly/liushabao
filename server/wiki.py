import wikipedia
import json

wiki = {}

def getWiki(keyword):
	try:
		result = wikipedia.summary(keyword)
		url = wikipedia.page(keyword).url
		wiki[keyword.strip()] = {'summary':result, 'url':url}
	except Exception, e:
		print('do noting')

input_file = open('/Users/lillian/hackathon/data/res/xaa.txt', 'r')
for line in input_file:
	print(line)
	getWiki(line)

output_file = open('wiki_1.txt', 'w')
output_file.write(json.dumps(wiki))