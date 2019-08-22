document.addEventListener("DOMContentLoaded", function() {
    console.log('page ready for action!');
    var navWidth = "165px";
    function openNav() {
        document.querySelector("nav").style.width = navWidth;
    }
    function closeNav() {
        document.querySelector("nav").style.width = "0";
    }
    document.querySelector("header").addEventListener("click", function() {
        var width = document.querySelector("nav").offsetWidth;
        if (width === 0) {
            openNav();
        }
        else {
            closeNav();
        }
        document.querySelector('.toggle').classList.toggle('close');
    });
});
