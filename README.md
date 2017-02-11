# shake-it
An AngularJS form shaking directive for angular and ionic. It includes an easy to use delegate that can be used to shake any element 
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

form_template.html
```html
    <form shake-it="loginForm" name="loginForm">
        <button ng-click="login(loginForm)">
            Login
        </button>
    </form>
```

formController.js
```js
$scope.login = function login(form) {
    if (!form.$valid) {
        ShakeItDelegate.shakeIt('loginForm');
    } else {
        //Do login
    }
}
```

### Questions, Comments, Concerns?
Contact git@streetdeck.com
