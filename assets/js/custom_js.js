const sidebar_collapse = document.querySelectorAll('.docs-nav .section-items .button_click');
const collapsing_content = document.querySelectorAll('.docs-nav .section-items .list_collapse');

console.log("Hello");


for (var x = 0; x < sidebar_collapse.length; x++)
{
	
	sidebar_collapse[x].onclick = function()
	{
		console.log(collapsing_content.length);
		for (var y = 0; y < collapsing_content.length; y++)
		{
			let sub_menu_class = collapsing_content[y].className.split(' ').slice(-1);
			if (sub_menu_class == "active")
				sub_menu_class = collapsing_content[y].className.split(' ').slice(-2, -1);
			let menu_class = "";
			if (this.classList.contains(sub_menu_class))
				menu_class = sub_menu_class;
			if (sub_menu_class == "active")
				menu = this.className.split(' ').slice(-2, -1);
			console.log("sub_menu is " + sub_menu_class);
			console.log("menu is " + menu_class);
			if (menu_class == sub_menu_class)
			{
				var currentState = collapsing_content[y].style.display;
				if (currentState == "none")
				{
					collapsing_content[y].style.display="block";
				}
				else
				{
					collapsing_content[y].style.display="none";
				}
			}
		}
	}
}



//Have the content of the webpage load another content on click


// $(document).ready(function () {
// 	$(function(){
// 		$("a.nav-link.scrollto").click(function(e){
// 			e.preventDefault(); //To prevent the default anchor tag behaviour
// 			var url = this.href;
// 			$(".main").load(url, function (){
// 				console.log("Load was performed");
// 			});

// 		});
// 	});


// });
