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

