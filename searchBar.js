function searchBar() {
  // Declare variables
  var input, filter, block, a,  i, txtValue;
  block = document.querySelectorAll('.item'); // ✔
  input = document.getElementById('myInput'); // ✔
  filter = input.value.toUpperCase(); // ✔
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < block.length; i++) {
    a = block[i].getElementsByTagName('a')[0]
    txtValue = a.textContent || a.innerText ;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      block[i].style.display = "";
    } else {
      block[i].style.display = "none";
    }
  }
}