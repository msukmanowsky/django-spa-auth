# What is this?

A repository showing a good and secure approach to user authentication using:

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)

TL;DR just use regular Django [`login`](https://docs.djangoproject.com/en/3.1/topics/auth/default/#how-to-log-a-user-in) and [`logout`](https://docs.djangoproject.com/en/3.1/topics/auth/default/#how-to-log-a-user-out) methods and use sessions.

# Why use cookies and sessions?

For a full explanation, check out [this blog post](https://mikesukmanowsky.com/authentication-with-django-and-spas/).

# The Approach

Building off a [comment I made](https://www.reddit.com/r/django/comments/irs2of/can_i_use_both_jwt_and_regular_tokens_in_one_drf/g56wyf5/?utm_source=reddit&utm_medium=web2x&context=3) on Reddit, I wanted to show a secure way to do authentication that does not involve using DRF's `TokenAuthentication` or JSON Web Tokens.

### Backend

The two files to look at are:

- [authentication.py](backend/api/authentication.py)
- [views.py](backend/api/views.py)

In [authentication.py](backend/api/authentication.py), we define a `CustomBasicAuthentication` class which stops DRF from sending a `WWW-Authenticate` header so browser don't give us an auth popup.

For logging in, the important part is to use `CustomBasicAuthentication` as an authentication class and then to use Django's standard `login()` method.

### Frontend

Files to look at are:

- [App.tsx](webapp/src/App.tsx)

Specifically how `login` and the initial authentication check is performed (via `useEffect`).

# Running this Code

You'll need Python 3 and Node JS installed locally before you begin.

1. Clone the repo `git clone https://github.com/msukmanowsky/django-spa-auth.git`
2. [Create a Python virtualenv](https://docs.python.org/3/library/venv.html) for your backend.
3. With your new virtualenv, run `(cd backend && python -m pip install -r requirements.txt && python manage.py migrate && python manage.py createsuperuser)` and follow the instructions to create a new superuser.
4. Run `(cd backend && python manage.py runserver)`
5. In a separate shell, run `(cd webapp && npm i && npm run start)`
6. Open your browser to [http://127.0.0.1:3000/](http://127.0.0.1:3000/) (**important** do _not_ use `localhost` as cookies are not saved on `localhost`)
7. Try logging in with your new username/password.
