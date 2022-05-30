
# Starting Project

## Basic Git commands

[Basic Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

```commandline
# branch
git branch -alh

# list 
git branch Or git branch -a Or git branch -l

# new branch and switch
git checkout -b <branchname>

# Switch from one branch
git checkout <branchname>


```
## Setting up

[REST Toturial](https://www.django-rest-framework.org/tutorial/quickstart/)

```commandline
pip freeze > requirements.txt
```

## Ignoring venv folder from git
* Create a .gitignore file in the main app directory
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
    * hostname
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

