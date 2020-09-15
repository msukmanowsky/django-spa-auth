from rest_framework.authentication import BasicAuthentication


class CustomBasicAuthentication(BasicAuthentication):
    def authenticate_header(self, request):
        # Important see https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu?lq=1
        return None
