from rest_framework.authentication import (
    BasicAuthentication,
    SessionAuthentication,
    get_authorization_header,
)


class CustomBasicAuthentication(BasicAuthentication):

    def authenticate_header(self, request):
        # Important see https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu?lq=1
        return None


class CSRFExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        # Disable CSRF check
        return
