from rest_framework import permissions

#
"""
class A:
  def __init__(self, gotname):
    # self.name = gotname
    self.ename = gotname

a = A(gotname='zahra')

getattr(a, 'name', None)
a.name

setattr(a, 'name', 'mina')
a.name = 'mina'


hasattr(a, 'name')
if a.name:
    pass
"""


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if getattr(obj, 'user', None) == user:
            return True
        # because fk relation is not true
        # if getattr(obj, 'patient', None) == user:
        #     return True
        if getattr(obj, 'assistant', None) == user:
            return True
        if getattr(obj, 'doctor', None) == user:
            return True
        if getattr(obj, 'laboratory', None) == user:
            return True
        if getattr(obj, 'pharmacy', None) == user:
            return True

        return False

