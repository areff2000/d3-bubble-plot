var my_dog = {
    name: 'fido',
    weight:'100',
    previous_weights: [80, 90, 95, 100, 110],
    
    }
    
    console.log (my_dog);







//interact

// get html

var cat_img = document.getElementById('cat_img');

var feed_me = document.getElementById('myButton');


var exercise_me = document.getElementById('myExercise');


// event listener

cat_img.addEventListener("click", meow);

feed_me.addEventListener("click", yummy);

exercise_me.addEventListener("click", exercise);


function meow() {
	alert("Meow");
}


function yummy() {
	cat_img.style.width = (cat_img.offsetWidth + 30.0) + 'px';
}


function exercise() {
	cat_img.style.width = (cat_img.offsetWidth - 30.0) + 'px';
}

// manipulate html element



