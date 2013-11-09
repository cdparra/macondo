# Simple img url list downloader (use in the study of reminiscens 
# to support the final book creation process)
#
# Cristhian Parra
import urllib
import csv
import os
import os.path
import sys, argparse, csv
import re

def download_picture(url,name):
    """
    download a picture from 'url' and save it to 'name'

    url = http://www.example.com/00000000.jpg
    path = ./pictures
    """
    image=urllib.URLopener()
    image.retrieve(url,name) 


# command arguments
parser = argparse.ArgumentParser(description='download photos from URLs listed in csv',\
	fromfile_prefix_chars="@")
parser.add_argument('file', help='csv file with URLs', action='store')
parser.add_argument('dir', help='directory where pictures should be saved', action='store')
args = parser.parse_args()

# parse arguments
csv_file = args.file
picsdir = args.dir

with open(csv_file, 'rb') as csvfile:
	storyreader = csv.reader(csvfile, delimiter=',', quotechar='"')
	included_cols = [0, 1, 3, 4, 5] # right now, using specifically structured csv for my current need, 
								 # future version will support reading the model somewhere else 

	for story in storyreader:
		content = list(story[i] for i in included_cols)
		
		storyid = content[0]	
		title = content[1]		
		photoid = content[2]
		url = content[3]
		picname = content[4]

		p = re.compile('http*') # pattern to test if the url is http

		if p.match(url):
			print "Downloading picture ("+photoid+") "+picname+" of story ("+storyid+") '"+title+"'"
			storypath = storyid + "_" + title 
			dirpath = os.path.join(picsdir,storypath)
			if not os.path.exists(dirpath):
				os.makedirs(dirpath)

			path = os.path.join(dirpath,picname)
			download_picture(url,path)
		else: 
			print "Story '"+title+"' has no valid URL associated"
