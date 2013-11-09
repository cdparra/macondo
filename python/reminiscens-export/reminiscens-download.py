# Simple img url list downloader (use in the study of reminiscens 
# to support the final book creation process)
#
# Cristhian Parra
import urllib
import csv
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
csv_file = args.file
pics_dir = args.dir

with open(csv_file, 'rb') as csvfile:
	storyreader = csv.reader(csvfile, delimiter=',', quotechar='"')
	included_cols = [1, 3, 4, 5]

	for story in storyreader:
		content = list(story[i] for i in included_cols)
		print content
		p = re.compile('http*') # pattern to test if the url is http
		title = content[0]		
		photoid = content[1]
		url = content[2]
		pic_name = content[3]
		if p.match(url):
			print "Downloading picture ("+photoid+") "+pic_name+" of story '"+title+"'"
			path = os.path.join(pics_dir,pic_name)
			download_picture(url,path)
