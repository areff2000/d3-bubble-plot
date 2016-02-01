//interact

// get html

var cat_img = document.getElementById('cat_img');

var feed_me = document.getElementById('myButton');


// event listener

cat_img.addEventListener("click", meow);

feed_me.addEventListener("click", yummy);



function meow() {
	alert("Meow");
}


function yummy() {
	alert("Yummy");
}

// manipulate html element



