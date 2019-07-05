FROM python:3
MAINTAINER Shreyas Murali Thottuvai <shreyas.murali@hotmail.com>

ADD www /opt/www
WORKDIR /opt/www

RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD [ "python", "./server.py" ]
