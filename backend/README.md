
# Starting Project
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