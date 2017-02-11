# background-data-service
An AngularJS form shaking directive. It includes an easy to use delegate that can be used to shake any element 
attributed with the shake-it directive.  This directive works great with Ionic too.  The .shake CSS class can be changed
to any animation you like.

There are other options out there to shake things with angular, but I wrote this to be more flexible.  Other options
require you to use it with a form submit.  This directive includes a delegate you can use to shake anything at any time.
Just attribute an element with the shake-it directive and optionally give it a name, then when you want to shake that
element from your controller, you simply call ShakeItDelegate.shakeIt(); and pass in the same name.  If you don't specify
a name, it will shake all active elements.


## Get Started

**(1)** Use Bower to get  shake-it
```
bower install shake-it
```

**(2)** Include `bower_components/shake-it/shake-it.js` in your angular or ionic app

**(3)** Add `shakeit` to your main module's list of dependencies 

**(4)** Add `shake-it="anyUniqueKey"` to the element you want to shake.  Call `ShakeItDelegate.shakeIt('anyUniqueKey');` 
when you want it to shake.



### Example

NOTE: This is an **Incomplete Example** TokenService, RecentService, FavoritesService are not provided.  You should 
replace TokenService with your authentication provider.  RecentService and FavoritesService are the services that 
should be called when idle.

```js
angular.module('yourApp').run(function ($q, $rootScope, TokenService, RecentService, FavoritesService) {
        // Data to get in the background when idle
        var deferredRecent = $q.defer();
        deferredRecent.promise.then(function(){
            //This calls two services simultaneously as the data they retrieve is small.  Register mulitple deferral
            //objects if your are retrieveing large amounts in the data in the background and don't want to over tax
            //your app.  
            RecentService.getRecent('patient');
            FavoritesService.getFavoritePrescriptions();
        });
        BackgroundDataService.callMeWhenIdle(deferredRecent);

        //Start the background idle timer after logging in, stop it when logging out
        $rootScope.$on(TokenService.authenticationStatusChanged, function (event, loggedIn) {
            if (loggedIn) {
                BackgroundDataService.init(3 /*idle seconds*/, true /* debug logging on */);
            } else {
                BackgroundDataService.stop();
            }
        });
    });
```

### Questions, Comments, Concerns?
Contact git@streetdeck.com
