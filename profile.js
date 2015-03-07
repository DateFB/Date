currentUser = {};

$("#loginbtn").click(function(){
    
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
          
        currentUser.fbUserAuthData = user;
        currentUser.fbUserName = user.attributes.username;
          
        if (!user.existed()) {
            // show welcome stuff
            console.log("User signed up and logged in through Facebook!");
            
            createInitialUser();
            
        } else {
            // user already has an account
            alert("User logged in through Facebook!");
            
            //createInitialUser();
        }
        
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
})

function createInitialUser(){
    var UserInformation = Parse.Object.extend("UserInformation");
    var userInfo = new UserInformation();

    userInfo.set("fbUserName", currentUser.fbUserName);

    userInfo.save(null, {
      success: function(userInfo) {
        // a bunch of nested async save calls to get user profile info
          
        // get some basic info
        FB.api(
            "/me",
            function (response) {
                if (response && !response.error) {
                    // get data from fb
                    currentUser.firstName = response.first_name;
                    currentUser.lastName = response.last_name;
                    currentUser.gender = response.gender;
                    currentUser.fb_id = response.id;
                    
                    
                    userInfo.set("firstName", currentUser.firstName);
                    userInfo.set("lastName",currentUser.lastName);
                    userInfo.set("gender", currentUser.gender);
                    userInfo.set("fb_id",currentUser.fb_id);
                    userInfo.save();
                    
                    // get profile pic from fb
                    FB.api(
                        "/me/picture",
                        {
                            "redirect": false,
                            "height": 200,
                            "width": 200,
                            "type": "normal"
                        },
                        function (response) {
                            if (response && !response.error) {
                                currentUser.profilePic = response.data.url;
                                userInfo.set("profilePic", currentUser.profilePic);
                                userInfo.save();
                            }
                            else{
                                console.log("Had trouble accessing FB API (#2)");
                            }
                        }
                    );
                }
                else{
                    console.log("Had trouble accessing FB API (#1)");
                }
            }
        );
        
          
      },
      error: function(userInfo, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
}

function getUserDetails(){
    var currentUser = Parse.User.current();
    if (currentUser) {
        console.log(currentUser)
        
        var UserInformationClass = Parse.Object.extend("UserInformation");
        var query = new Parse.Query(UserInformationClass);
        query.equalTo("fbUserName", currentUser.attributes.username);
        query.find({
          success: function(results) {
            
              userInfo = results[0];
              console.log(userInfo.get("gender"));
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
        
        
    } else {
        // show the signup or login page
        console.log("crap, user got to this page and they aren't logged in")
    }
}