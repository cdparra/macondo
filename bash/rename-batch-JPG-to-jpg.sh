#!/bin/sh
# Simple script to rename a list of files with .JPG extentions to .jpg
# Why?: once I had a list of .JPG on a server that once downloaded from 
# the browswer were recognized as octet-stream instead of image/jpeg
# thise caused some problems in automated scripts (i.e. pandoc trying
# to convert a text markdown file in pdf). The simplest solution 
# was to rename files to .jpg

for i in *.JPG; do cp $i `basename $i .JPG`.jpg; done
