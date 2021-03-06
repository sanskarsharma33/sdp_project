from rest_framework import permissions
from rest_framework.response import Response
import logging


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        return obj.user == request.user and request.user.is_vendor