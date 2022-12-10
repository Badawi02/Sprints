#run python image
FROM python:latest

#run commands in bash shell
SHELL [ "/bin/bash","-c" ]

#make dir name app and cd to it
WORKDIR /app

#copy req to app dir
COPY requirements.txt .

#install framework for app
RUN pip install -r requirements.txt

#copy app to cont.
COPY app.py .

#make port for cont.
EXPOSE 5000

#command run app
CMD python app.py