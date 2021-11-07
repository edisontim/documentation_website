const sidebarLinks = document.querySelectorAll('#docs-sidebar .scrollto');


sidebarLinks.forEach((sidebarLink) => {
	
	sidebarLink.addEventListener('click', (e) => {
		
		e.preventDefault();
		
		// var target = sidebarLink.getAttribute("href").replace('#', '');
		
		//console.log(target);
		
        // document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        
        sidebarLink.style.height("0px");
        //Collapse sidebar after clicking
		if (sidebar.classList.contains('sidebar-visible') && window.innerWidth < 1200){
			
			sidebar.classList.remove('sidebar-visible');
		    sidebar.classList.add('sidebar-hidden');
		} 
		
    });
	
});