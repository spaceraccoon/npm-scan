fetch(document.location.href)
.then(resp => {
  const csp = resp.headers.get('Content-Security-Policy');
  // does this exist? Is is any good?
});