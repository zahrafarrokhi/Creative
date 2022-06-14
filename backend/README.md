
# Starting Project

## Basic Git commands

[Basic Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)
```commandline
# view commit history tree
git log --graph
```
```commandline
# branch
git branch -h

# list 
git branch Or git branch -a Or git branch -l

# new branch and switch
git checkout -b <branchname>

# Switch from one branch
git checkout <branchname>


```

### Reset to a specific commit

```commandline
git log --graph # find commit hash you want to reset to
```

```commandline
* commit 6c944544375f61a19c8920aa2d3a7cb4eef10ed4 (HEAD -> main, origin/main, origin/HEAD)
| Author: zahrafarrokhi <zahrafarrokhi2017@gmail.com>
| Date:   Mon May 30 16:10:19 2022 +0430
| 
|     add patients models and urls
| 
* commit 521bd3ed850144e7e93dd65889dd811a96cec3cf
| Author: zahrafarrokhi <zahrafarrokhi2017@gmail.com>
| Date:   Mon May 30 16:06:51 2022 +0430
| 
|     add patients app
| 
* commit 3324fe8a120ab98434beb66ad9bd5cdb22849815 ---> commit that we want
| Author: zahrafarrokhi <zahrafarrokhi2017@gmail.com>
| Date:   Mon May 30 16:01:58 2022 +0430
| 
|     fix state and style
| 
```

```commandline
 git reset --hard 3324fe8a120ab98434beb66ad9bd5cdb22849815
 git reset --soft 3324fe8a120ab98434beb66ad9bd5cdb22849815 # keeps files
  ```

If you have already pushed to git, you need to use force. 
Because git is a few commits ahead of you and thinks that you just haven't pulled yet
so it asks you to `git pull` first.

```commandline
# use force to push
git push --force origin main
```

## Setting up

[REST Toturial](https://www.django-rest-framework.org/tutorial/quickstart/)

```python
# Create the project directory
mkdir creative
cd creative

# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install Django and Django REST framework into the virtual environment
pip install django
<!--stabel  -->
pip install django==3.2
pip install djangorestframework
pip install djangorestframework-gis
pip install django-filter
pip install -U django-celery-beat

pip freeze > requirements.txt

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    #  'GhodadBackend.apps.CustomAdminConfig',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    #  'django_extensions',
    'rest_framework',
    'rest_framework_gis',
    'django_filters',
    'jwt',
    'django_celery_beat',
    # apps
    'constant_data',
    'authentication',
    'base_classes',
    'payments',
    'patients',
    'visits',
    'doctors',
    'chat',
    'support',
    'pharmacy',
    'laboratories',
    'notifications',
    'assistants',
]
# Set up a new project with a single application
django-admin startproject backend .  # Note the trailing '.' character

# Set up a app 
django-admin startapp authentication

************
# The project layout should look like:
$ pwd
<some path>/backend
$ find .
************* 

# migrate
python manage.py migrate
# createsuperuser
python manage.py createsuperuser --email admin@example.com --username admin

# createsuperuser with commandline
python manage.py createsuperuser2 --email=admin@example.com --password=1234


```

## Ignoring venv folder from git
* Create a .gitignore file in the main app directory
* touch .gitignore
* nano .gitignore
* cat .gitignore
* 
* add `venv/` to gitignore file to ignore venv


You may also need to add the following
```gitignore
__pycache__ -> pycache is compiled python code and should not be commited to git
db.sqlite3 -> default database for django
.idea -> pycharm project file
.env -> main environment file

/Pipfile

*** THESE ARE OPTIONAL ***
requirements.txt.checksum -> Used for checking if requirements file has changed before a new build, only used with makefile and build.sh

tmps/* -> temperory directory used for testing
logs/*
static/*
media/*

```
## env
* touch .env
* touch .env.example

## Setting up django environment
[Django Environ Docs](https://django-environ.readthedocs.io/en/latest/getting-started.html)
```commandline
python -m pip install django-environ
```


In 'settings.py':
```python
import environ


env = environ.Env(
    # You can set default values here
    DEBUG=(bool, False)
)
```

### Using environment to set django secret

In settings.py
```python
SECRET_KEY = env('SECRET_KEY')
environ.Env.read_env()
```

In .env
```commandline
SECRET_KEY=
```
## Installing jazzmin
[install jazmin](https://pypi.org/project/django-jazzmin/)
```commandline
pip install django-jazzmin
```
* add to install app settings
[jazzmin](https://django-jazzmin.readthedocs.io/installation/)
```python
INSTALLED_APPS = [
    #first line
    'jazzmin',

    'django.contrib.admin',
    [...]
]
```

## Installing requests
```commandline
pip install requests
```

## Installing PyJWT
```commandline
pip install PyJWT
```

# install postgresql
[postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

```commandline
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
sudo -i -u postgres # Login as postgres user
psql # Login to postgres with postgres user
```
```commandline
postgres# \q # to exit postgres
```
Because we ran `sudo -i -u postgres ` we are still logged in as postgres. To logout simply run `exit` in terminal

## Setup pgAdmin
[pgAdmin](https://www.pgadmin.org/download/pgadmin-4-apt/)
```commandline
#
# Setup the repository
#

# Install the public key for the repository (if not done previously):
sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add

# Create the repository configuration file:
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

#
# Install pgAdmin
#

# Install for both desktop and web modes:
sudo apt install pgadmin4
```

### Registering servers to pgAdmin

* Right click on servers -> register -> server
* Fill out the following fields
    * name: any name you like
    * hostname => localhost,127.0.0.1
    * port
    * username: default postgres user is `postgres`
    * password: default postgres password is `postgres`
![General tab](./screenshots/pgadmin-newserver-general.png)
![Connection tab](./screenshots/pgadmin-newserver-connection.png)


# Connecting django with postgres
## Installing psycopg2

```
pip install psycopg2
```
## postgres with docker
[postgres](https://hub.docker.com/_/postgres)
* create docker services repository
* create docker-compose.yml
```yml
version: '3.9'

services:

  postgres_db:
    image: postgres
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    ports:
      - 666:5432
    environment:
      POSTGRES_PASSWORD: ${PG_PASSWORD:-postgres}

volumes:
  postgres_data:
  
```
* create .env and .env.example
```
.env
PG_PASSWORD=1234

```
* Running dockers
```sh
docker-compose pull ## Get image from remote server
docker-compose build ## build local images
docker-compose up -d [--force-recreate] [--build] ## by default docker-compose up both pulls and builds images, but it doesnt rebuild by default, in order to rebuild use --build, --force-recreate recreates dockers that are already running
docker-compose down [--remove-orphans] ## remove orphans removes running containers that are no longer attached to docker file
```

## DockerFile

```DockerFile
FROM python:3.8.3-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1

COPY . .

ARG name

RUN apk update \
    && apk update && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add --virtual build-deps \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-deps

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

```
With the above code, the install commands will run everytime anyfile in the project changes. In order to prevent this, we can first copy requirements.txt 
and then after installing all requirements copy the rest of the project.
```DockerFile
FROM python:3.8.3-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1


ARG name

RUN apk update \
    && apk update && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add --virtual build-deps \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-deps

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . . 
# COPY . /app == COPY . .
```
Now we can seperate this docker file into two docker files, one just for installing requirements, and one for setting up the project.
```Dockerfile
# backend-python.dockerfile
FROM python:3.9.7

WORKDIR /app

RUN apt-get -y update
RUN apt-get -y install python3.9-dev default-libmysqlclient-dev gcc -y

RUN apt-get update && apt-get install --yes libgdal-dev

COPY requirements.txt .
RUN pip install -r requirements.txt

RUN apt-get -y remove gcc
```
Now we just copy django project files:
```Dockerfile
# backend.dockerfile
FROM creative-backend-python:latest

COPY . . 


RUN chmod +x ./entrypoint_*.sh
```


Now we need to build these packages:
```sh
docker build -f backend-python.dockerfile -t creative-backend-python:latest . --no-cache
docker build -f backend.dockerfile -t creative-backend:latest . --no-cach
```

We can use Makefile to run these commands easier(this code also uses commit id to set package tag):
```makefile
LAST_TAG_COMMIT := $(shell git rev-list --tags --max-count=1)
LAST_TAG := $(shell git describe --tags $(LAST_TAG_COMMIT))
LAST_COMMIT := $(shell git rev-parse HEAD)


ifeq ($(LAST_COMMIT), $(LAST_TAG_COMMIT))
	TAG := $(LAST_TAG)
else
	TAG := $(LAST_COMMIT)
endif

base_package:
	docker build -f backend-python.dockerfile -t clinic-backend-python:latest . --no-cache

production: 
	docker build -f backend.dockerfile -t clinic-backend:$(TAG) -t clinic-backend:latest . --no-cache
```
```sh
make base_package
make production
```

Now we want to do some more automation. We want to automatically check if requirements.txt has changed, and only run `make base_package` if it has.
```sh
# build.sh
# sampel: ./build.sh production
#!/bin/bash

stage=$1 # stage is production


if test -f "./requirements.txt.checksum"; 
	then
    echo "./requirements.txt.checksum exists."
	else
		touch requirements.txt.checksum
fi

newreq=$(sha256sum ./requirements.txt | awk '{print $1}')
prereq=$(cat ./requirements.txt.checksum)

echo $newreq
echo $prereq

if [[ "$newreq" != "$prereq" ]];
then
	echo "BUILDING BASE PACKAGE"

	make base_package && echo $newreq > ./requirements.txt.checksum
fi

make $stage
```

In docker-compose, instead of using long commands we can use entry_point files to run the required commands:
```sh
# entrypoint.sh
#!/bin/sh

echo "Starting..."

echo "Migarating the database..."
python3 manage.py migrate

echo "Loading database data..."
python3 manage.py loaddata constant_data/fixture/0001-cities.json

echo "Collecting static files..."
python3 manage.py collectstatic --noinput

echo "Starting the server..."
[ ! -z "$GUNICORN_WORKERS" ] || $GUNICORN_WORKERS=4
gunicorn GhodadBackend.wsgi:application --timeout 120 --workers $GUNICORN_WORKERS --bind 0.0.0.0:8000

```


## Creating a new database
* In your desired server, right click on databases -> create -> database
![New database](./screenshots/pgadmin-newdatabase.png)
![New database](./screenshots/pgadmin-newdatabase-main.png)
* Add your database to django 
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': env('DATABASE_HOST'),
        'PORT': env('DATABASE_PORT'),
    }
}

```

# Django custom superuser commands

```
python manage.py createsuperuser2 --phone-number=09****** --password=1234

python manage.py createsuperuser2 --email=example@test.com --password=1234
```

# Setting up SMPT email service with gmail
* [Tutorial](https://support.google.com/accounts/answer/6010255?hl=en#zippy=%2Cif-less-secure-app-access-is-on-for-your-account%2Cif-less-secure-app-access-is-off-for-your-account)
* Be sure to allow less secure apps to use gmail: [Gmail](https://support.google.com/accounts/answer/6010255?hl=en#zippy=%2Cif-less-secure-app-access-is-on-for-your-account%2Cif-less-secure-app-access-is-off-for-your-account)

 
In settings.py add email settings:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_USE_TLS = True
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = env('EMAIL_HOST_USER')
EMAIL_USE_SSL = False
```

And then update .env file:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

You also need to create a template for your email. set this template in `authentication/services.py:34`


# Customizing authentication in Django
* [Tutorial](https://docs.djangoproject.com/en/4.0/topics/auth/customizing/)
* [example1](https://virgool.io/@gholami.ayub73/custom-django-model-j3e1mpp4ri5t)
* [example2](https://barnamenevisan.org/Articles/Article8849.html)
```python
models.py

from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
     pass
class User(AbstractUser):
    ...
    objects = UserManager() # manager:By default, Django adds a Manager with the name objects to every Django model class
```
### Managers
By default, Django adds a Manager with the name [objects](https://docs.djangoproject.com/en/4.0/topics/db/managers/#manager-names-1) to every Django model class. 
* [Tutorial](https://docs.djangoproject.com/en/4.0/topics/db/managers/)
## jwt and passwordless
* [jwt](https://github.com/jazzband/djangorestframework-simplejwt)
* [passwordless](https://github.com/aaronn/django-rest-framework-passwordless)

## authentication test
* curl
 * Requesting OTP
```commandline 
curl --request POST '127.0.0.1:8000/auth/mobile/' --form 'phone_number=09122465489'
```
You can view the code in admin panel
```json
{"detail":"A login token has been texted to you."}
```
 * Login
```commandline 
curl --request POST '127.0.0.1:8000/auth/confirm/' --form 'phone_number=091*******' --form 'token=1439'
```
```json
{
 "phone_number":"091*******",
 "token":"1439",
 "user":{
   "id":2,
   "phone_number":"09122465489",
   "email":"",
   "phone_number_verified":true,
   "email_verified":false,
   "type":"patient"
   },
    "access_tok":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MTA3MzMwLCJqdGkiOiI2Y2M1NGRhZDIzYWY0MGQ4YThiYTg5MDE0YjVhNWZiZCIsInVuaXF1ZV9pZCI6Mn0.9y1zXVpzrrOkTaySrTmoFuMVaPZb8d6r9kR7MHOwAGc",
 "refresh_tok":"71FC23343B274B41AE382370082F63C6",
 "refresh_tok_exp":"2022-08-12T07:57:10.804413Z",
 "access_tok_exp":"2022-06-13T08:02:10.804302Z"
}
```
## fixtures
* [iran-cities](https://github.com/ahmadazizi/iran-cities)
* You can find this example in `constant_data/fixtures/city_data_convertor`
#### downlaod  csv files
1. Create a city_data_convertor folder to download and convert city data
2. cd city_data_convertor
3. Download data
```commandline
# terminal
wget https://raw.githubusercontent.com/ahmadazizi/iran-cities/master/releases/v3.0/csv/ostan.csv
wget https://raw.githubusercontent.com/ahmadazizi/iran-cities/master/releases/v3.0/csv/shahrestan.csv
```

4. Create `convert.py`

* [python-csv](https://sabzdanesh.com/python-csv/)
```python
import csv
import json

data = []

with open('./ostan.csv') as csvFile:
    reader = csv.reader(csvFile)
    next(reader)
    for row in reader:
        data.append({'model': 'constant_data.city', 'pk': row[0],
                     'fields': {'fa_name': row[1], 'name': row[1]}})

with open('./shahrestan.csv') as csvFile:
    reader = csv.reader(csvFile)
    next(reader)
    for row in reader:
        data.append({'model': 'constant_data.city', 'pk': 60 + int(row[0]),
                     'fields': {'fa_name': row[1], 'name': row[1], 'parent':
                                row[2]}})


fl = open("0001-cities.json", 'w')

json.dump(data, fl)

fl.close()
```
5. run `python3 convert.py`
6. You will have a `0001-cities.json` fixture
7. Copy this file to your fixtures folder
```
python3 manage.py loaddata constant_data/fixtures/0001-cities.json

```

## perform_create 
as you know save is update or create.in this instance(perform_create)
save means create object

```python
    def save(self, **kwargs):
        ...
        validated_data = {**self.validated_data, **kwargs}

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
            ...
        else:
            self.instance = self.create(validated_data)
            ...

        return self.instance

```

calling serializer.save()


You can customize actions before or after saving

# Gis Database

[Gis django installation guide](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/#installation)

You need to configure postgres for gis
* [Postgis](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/postgis/)

As the guide suggests you need to install the following messages:
* [Geos](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/geolibs/#geosbuild)
  * [Geos](https://libgeos.org/usage/install/)
* [Proj4](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/geolibs/#proj4)
  * [Proj4](https://proj.org/)
* [Gdal](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/geolibs/#gdalbuild)
  * [Gdal](https://gdal.org/)

Next you need to change database engine in `settings.py` to the one specified in the following link 
[Spatial Backends](https://docs.djangoproject.com/en/4.0/ref/contrib/gis/db-api/#spatial-backends)
