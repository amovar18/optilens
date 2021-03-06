define({ "api": [
  {
    "version": "0.2.0",
    "type": "post",
    "url": "/auth/signin",
    "title": "signin or authenticate a user.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "cookie",
            "optional": false,
            "field": "Token",
            "description": "<p>containing id and type of user details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userType",
            "description": "<p>type of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Links",
            "description": "<p>Available links for user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong",
            "description": "<p>password The provided password was wrong.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "controllers/authenticationcontroller.js",
    "group": "C:\\Users\\Geeta\\opticonnect\\backend\\controllers\\authenticationcontroller.js",
    "groupTitle": "C:\\Users\\Geeta\\opticonnect\\backend\\controllers\\authenticationcontroller.js",
    "name": "PostAuthSignin"
  }
] });
