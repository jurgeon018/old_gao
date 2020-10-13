import random
import string
import datetime
import pickle
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from googleapiclient.discovery import build
from google.auth.transport.requests import Request


def Create_Service(client_secret_file, api_name, api_version, *scopes):
    print(client_secret_file, api_name, api_version, scopes, sep='-')
    CLIENT_SECRET_FILE = client_secret_file
    API_SERVICE_NAME = api_name
    API_VERSION = api_version
    SCOPES = [scope for scope in scopes[0]]  
    cred = None
    pickle_file = f'token_{API_SERVICE_NAME}_{API_VERSION}.pickle'
    if os.path.exists(pickle_file):
        with open(pickle_file, 'rb') as token:
            cred = pickle.load(token)
    if not cred or not cred.valid:
        if cred and cred.expired and cred.refresh_token:
            cred.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            cred = flow.run_local_server()

        with open(pickle_file, 'wb') as token:
            pickle.dump(cred, token)
    try:
        service = build(API_SERVICE_NAME, API_VERSION, credentials=cred)
        print(API_SERVICE_NAME, 'service created successfully')
        return service
    except Exception as e:
        print('Unable to connect.')
        print(e)
        return None

def convert_to_RFC_datetime(year=1900, month=1, day=1, hour=0, minute=0):
    dt = datetime.datetime(year, month, day, hour, minute, 0).isoformat() + 'Z'
    return dt


def get_random_string(length):
  letters = string.ascii_lowercase
  result_str = ''.join(random.choice(letters) for i in range(length))
  print("Random string of length", length, "is:", result_str)
#   return result_str



def generate_hangouts_link(request):
  CLIENT_SECRET_FILE = 'google_calendar.json'
  API_NAME = 'calendar'
  API_VERSION = 'v3'
  SCOPES     = ['https://www.googleapis.com/auth/calendar']
  service    = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
  date_start = datetime.datetime.utcnow().isoformat() + 'Z'
  date_end   = (datetime.datetime.utcnow() + datetime.timedelta(hours = 1)).isoformat() + 'Z'
  body = {
    "calendarid":"HELLO!",
    "summary": "summary1",
    "description": "description11",
    "conferenceData": {
      "createRequest": {
        "conferenceSolutionKey": {
          "type": "hangoutsMeet",
        },
        "requestId": str(get_random_string(10)),
      },
      "entryPoints": [
        {
          "entryPointType": "video"
        },
      ],
      "conferenceSolution": {
        "key": {
          "type": "hangoutsMeet"
        },
        "name": "Google Meet",
        "iconUri": "https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v",
      },
    },
    "start": {
      "dateTime": date_start,
      "timeZone": "Europe/Kiev",
    },
    "end": {
      "dateTime": date_end,
      "timeZone": "Europe/Kiev",
    },
  }

  # Цей рядок створює гуглкалендар 1 раз
  created_event = service.calendars().insert(body=body).execute()
  # print("created_event", created_event)

  # Цей рядок створює в гуглкалендарі подію
  calendar_id   = 'ev4qphhbg2l5pgo9da2ekahoi0@group.calendar.google.com'
  created_event = service.events().insert(calendarId = calendar_id, body = body, conferenceDataVersion = 1).execute()
  hangoutLink   = created_event.get("hangoutLink")
  return hangoutLink
#   calendars     = service.calendarList().list().execute()['items']
  # for calendar in calendars:
  #   print(calendar)
  #   TODO: привязати календар до адвоката
