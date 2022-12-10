#run python image
FROM httpd:latest

#run commands in bash shell
SHELL [ "/bin/bash","-c" ]

#copy req to app dir
COPY static.html /usr/local/apache2/htdocs/

COPY httpd.conf /usr/local/apache2/conf/

#make port for cont.
EXPOSE 9999

#add variable to cont.
ENV CONTAINER=docker

#command run app
CMD echo $CONTAINER && httpd -D FOREGROUND