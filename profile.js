<!doctype html>
<html class="no-js" lang="">
<head>
    <title>Date</title>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <!-- Place favicon.ico in the root directory -->
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>


    <!-- Parse Javascript Library -->
    <script type="text/javascript" src="https://www.parsecdn.com/js/parse-1.3.5.min.js"></script>

</head>


<body>
    <script>
      // Initialize Parse
      Parse.initialize("q46GGBIFXMFTwkTFjjvDNT26Zc8d21jVwQehkeKv", "WAQ3OTvsP6Ka7bx00sM7JhgiENyU0izNVftDJOJD");

    </script>
    <div id="map-canvas"></div>

    <!-- Our JS files -->
    <script src="parseUtils.js"></script>

    <script type="text/javascript">
        var DateInfo = Parse.Object.extend("Date");
        var dateinfo = new DateInfo();

        dateinfo.set("UserID", "111");
        dateinfo.set("DateString", new Date());
        dateinfo.set("Headline", "Make it a double.");
        dateinfo.set("LocationName", "Starbucks");

        var point = new Parse.GeoPoint({latitude: -40, longitude: 120});
        dateinfo.set("LocationGeo", point);

        dateinfo.set("Blind", false);
        dateinfo.set("Purpose", "coffee");
        dateinfo.set("Description", "do stuff");

        dateinfo.set("PosterAge", 27);
        dateinfo.set("PosterGender", "male");

        dateinfo.set("PosterMinAgePref", 23);
        dateinfo.set("PosterMaxAgePref", 30);
        dateinfo.set("PosterGenderPref", "male");

        dateinfo.save(null, {
            success: function(dateinfo) {
                console.log("yup");
            },
            error: function(dateinfo, error) {
                console.log("nope");
            }
        });



    </script>

</body>
</html>
