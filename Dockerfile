#Specify the version of nodejs.
FROM node:14.0

#Creating an application directory
RUN mkdir /app
#Use app directory as development directory
WORKDIR /app

#RUN apt-get update

# UPDATE 20220221 
RUN echo "20220302-2116"
COPY package.json ./
# package.Install the package described in json.
RUN npm i

# Error: libGL.so.1: cannot open shared object file: No such file or directory
# https://stackoverflow.com/a/63377623
#RUN apt-get install ffmpeg libsm6 libxext6  -y
#RUN apt install libgl1-mesa-glx -y

#RUN apt-get install -y python3-opencv -y
#RUN pip install opencv-python


#Package in container.json and packate-lock.Make sure that two of json are copied


#installed node_Copy files such as module to the container side.
#COPY . .

#RUN ls /app/*
#CMD ["npm","run", "4.webpack-build-production"]
#CMD ["npm", "run","gui-test"]