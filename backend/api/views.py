from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions

from api.authentication import CustomBasicAuthentication
from api.serializers import UserSerializer


@api_view(["POST"])
@authentication_classes([CustomBasicAuthentication, SessionAuthentication])
def login(request: Request) -> Response:
    # Important, this sets the session cookie on the response
    django_login(request, request.user)
    return Response(UserSerializer(request.user).data)


@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout(request: Request) -> Response:
    django_logout(request)
    return Response({})


@api_view(["GET"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def me(request: Request) -> Response:
    return Response(UserSerializer(request.user).data)
