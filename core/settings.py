import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = '5mhjadw1o@#z455b%^v1v%s7mdi$_v7)ty4jgfeb1s(^t0et)l'
DEBUG = True
ALLOWED_HOSTS = ["*"]
INSTALLED_APPS = [
    'filebrowser',
    'modeltranslation',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.redirects',
    'django.contrib.flatpages',
    'django.contrib.sitemaps',

    'box.core',
    'box.core.sw_content',
    'box.core.sw_global_config',
    'gao',

    'sw_liqpay',
    
    'tinymce',
    'rest_framework',
    'import_export',
]
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'box.core.middleware.DisableCSRF',
]
ROOT_URLCONF = 'gao.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'gao.context_processors.team',
            ],
        },
    },
]
WSGI_APPLICATION = 'core.wsgi.application'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]
LANGUAGE_CODE = 'uk'
LANGUAGES = (
    ('uk',"uk"),
    # ('ru',"ru"),
)
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

SITE_ID = 1

AUTH_USER_MODEL = 'gao.User'
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_USE_TLS = True
# EMAIL_PORT = 587
# EMAIL_HOST_USER = 'jurgeon018@gmail.com'
# EMAIL_HOST_PASSWORD = 'yfpfhrj69001'

LOGIN_URL = '/'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.galpravgroup.com.ua'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'office@galpravgroup.com.ua'
EMAIL_HOST_PASSWORD = 'galprav69018'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


LIQPAY_PRIVATE_KEY = 'ZMvIe9WXCH19g64bvR6dwTMplK1q0950GhkGp3T0'
LIQPAY_PUBLIC_KEY = 'i28278182976'

LIQPAY_SANDBOX_PRIVATE_KEY = 'sandbox_ZC909HGHFAWRTyR0E5nCZkXrkaJZTaLQtCbLu2nr'
LIQPAY_SANDBOX_PUBLIC_KEY = 'sandbox_i60957727413'

LIQPAY_SANDBOX_MODE = 1


LOGIN_REDIRECT_URL = 'cabinet'
REST_FRAMEWORK = {
    # 'DEFAULT_RENDERER_CLASSES': [
    #     'rest_framework.renderers.JSONRenderer',
    # ],
    # 'DEFAULT_PARSER_CLASSES': [
    #     'rest_framework.parsers.JSONParser',
    # ]
    'DATE_INPUT_FORMATS':[
        '%d.%m.%Y',
    ]
}

DATE_INPUT_FORMATS = [
    '%Y-%m-%d', '%m/%d/%Y', '%m/%d/%y', # '2006-10-25', '10/25/2006', '10/25/06'
    '%b %d %Y', '%b %d, %Y',            # 'Oct 25 2006', 'Oct 25, 2006'
    '%d %b %Y', '%d %b, %Y',            # '25 Oct 2006', '25 Oct, 2006'
    '%B %d %Y', '%B %d, %Y',            # 'October 25 2006', 'October 25, 2006'
    '%d %B %Y', '%d %B, %Y',            # '25 October 2006', '25 October, 2006'
]


TINYMCE_DEFAULT_CONFIG = {
  'height': 360,
  # 'width': 920,
  'width': 'auto',
  # 'cleanup_on_startup': True,
  'cleanup_on_startup': False,
  'custom_undo_redo_levels': 20,
  'selector': 'textarea',
  'theme': 'modern',
  'plugins': '''
    textcolor save link image media preview codesample contextmenu
    table code lists fullscreen  insertdatetime  nonbreaking
    contextmenu directionality searchreplace wordcount visualblocks
    visualchars code fullscreen autolink lists  charmap print  hr
    anchor pagebreak
    ''',
  'toolbar1': '''
    fullscreen preview bold italic underline | formatselect fontselect,
    fontsizeselect  | forecolor backcolor | alignleft alignright |
    aligncenter alignjustify | indent outdent | bullist numlist table |
    | link image media | codesample |
    ''',
  'toolbar2': '''
    visualblocks visualchars |
    charmap hr pagebreak nonbreaking anchor |  code |
    ''',
  'contextmenu': 'formats | link image',
  'menubar': True,
  'statusbar': True,
  'inline': False,

}

