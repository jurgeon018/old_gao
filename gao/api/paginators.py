from rest_framework.pagination import PageNumberPagination



class CustomPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    page_query_param = 'page_number'
    max_page_size = 300
