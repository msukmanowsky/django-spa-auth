from rest_framework.authentication import SessionAuthentication, BasicAuthentication, get_authorization_header


class CustomBasicAuthentication(BasicAuthentication):

    def authenticate_header(self, request):
        # Important see https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu?lq=1
        return None

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening
