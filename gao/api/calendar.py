from pprint import pprint
from Google import Create_Service
CLIENT_SECRET_FILE = 'client_secret_265275298449-55889u8v12kicq500au3p573ked0jue8.apps.googleusercontent.com.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)