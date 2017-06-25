Assumptions

A User should have atleast one role and can have multiple roles.
A Role can have atleast one permssion or multiple permissions on a resource.
If User has a role which has a permission then only user should be allowed to act on the resource.
If User does not have permission to act on the resource, user should be given error code of 403.