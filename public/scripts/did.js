  $(document).ready(function() {

        var userName = DisneyID.readLocalData("welcome_name");
        
        $(".did-btn").click(function(event) {
             event.preventDefault();
        });

        $("#did-signout").hide();

        if (userName) {
            // console.log('userName is: ' +userName);

            $("#did-signout p.out").html("<span id='didHello'>Hello</span> <span id='didUserName'>" + userName + "</span><div class='arrow-down'></div>");
            $("#did-signout").show();
            $("#did-signin").hide();
            $("#disneyID").show();

        }

    });

    //The responderPage and cssOverride properties must be absolute paths. 
    var domainURL = window.location;
    var didResponderPage = domainURL + 'didresponder.html'; 

    var didCSSOverride = domainURL +'styles/did-inner-override.css'; //this must be an https:// reference in order to work in Chrome.

    var did = new DisneyID(didResponderPage,didCSSOverride);

    did.init({
        appId:"DIM-DISNEYBABY-STAGE", // your client id goes here
        env:"STG", // PROD
        responderPage: didResponderPage, //optional override for responder page setting
        cssOverride : didCSSOverride, //optional override for skinning the Lightbox UI modal
        silentAutoLogin : true, //optional, default false
        showBackground : true, //optional, default true
        debug : true, //optional, default false
        createTestAccounts : true, //optional, default false
        successPageAfterCreate : false, //optional, default true
        htmlEncodeReturnData:true, // required


        loginSuccess:function(data) { // optional method to capture login, logged in guests profile will be the parameter passed in
            // console.log ('loginSuccess');

            DisneyID.writeLocalData("welcome_name", data.firstName, "/", 30, DisneyID.debug);
            DisneyID.log(data);

            //Profile data to be used by DisneyBaby
            console.log('this is the data object: '+data);
            console.log("access_token: " + data.access_token);
            console.log("refresh_token: " + data.refresh_token);
            console.log("blue_token: " + data.blueCookie);
            console.log("scope: " + data.scope);
            console.log("swid: " + data.swid);

            $("#did-signout p.out").html("<span id='didHello'>Hello</span> <span id='didUserName'>" + data.firstName + "</span><div class='arrow-down'></div>");

            $("#did-signout").show();
            $("#did-signin").hide();
            $("#disneyID").show();
        },
        createSuccess:function(data) { // optional method to capture registration, logged in guests profile will be the parameter passed in
            // console.log('createSuccess');
            
            DisneyID.writeLocalData("welcome_name", data.firstName, "/", 30, DisneyID.debug);
            DisneyID.log(data);
            
             //Profile data to be used by DisneyBaby
            console.log('this is the data object: '+data);
            console.log("access_token: " + data.access_token);
            console.log("refresh_token: " + data.refresh_token);
            console.log("blue_token: " + data.blueCookie);
            console.log("scope: " + data.scope);
            console.log("swid: " + data.swid);

            $("#did-signout p.out").html("<span id='didHello'>Hello</span> <span id='didUserName'>" + data.firstName + "</span><div class='arrow-down'></div>");


            $("#did-signout").show();
            $("#did-signin").hide();
            $("#disneyID").show();


            did.closeIFrame();
            window.scrollTo(0, 0);
        },
        updateSuccess:function(data) { // optional method to capture update success, updated guest profile will be the parameter passed in
            // console.log('updateSuccess');
            
            DisneyID.log("Test update success.");
            DisneyID.writeLocalData("welcome_name", data.firstName, "/", 30, DisneyID.debug);
            DisneyID.log(data);


             // $("#did-signout p.out").html("hello, <a href='#' class='disneyid-updateprofile did-btn'>"+data.firstName+"</a>");
            $("#did-signout p.out").html("<span id='didHello'>Hello</span> <span id='didUserName'>" + data.firstName + "</span><div class='arrow-down'></div>");
             
            $("#did-signout").show();
            $("#did-signin").hide();
            $("#disneyID").show();

        },

        logoutSuccess:function(data) { // optional method to capture logout, logged out guests profile will be the parameter passed in
            // console.log('logoutSuccess');

            DisneyID.log("Test logout success.");
            $("#did-signout").hide();
            $("#did-signin").show();
            DisneyID.deleteLocalData("welcome_name", "/");
        }

    });


