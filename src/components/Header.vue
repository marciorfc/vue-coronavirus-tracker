<template>
  
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
     
    <a class="navbar-brand" href="#">Coronavirus Tracker</a>    
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
  

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/world" class="nav-item" activeClass="active" tag="li"><a class="nav-link">No mundo</a></router-link>  
        <router-link to="/country" class="nav-item" activeClass="active" tag="li"><a class="nav-link">No Brasil</a></router-link> 
      </ul>
      
  </div>
</nav>
    
</template>