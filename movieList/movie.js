let list = []

$(function(){
    $("#form").on("submit",function(event){
        event.preventDefault();
        let name = $("#movie-name").val();
        let rating = $("#rating").val();
        
        if(name.length < 2 ){
           return alert("Please submit a valid moive title")
        }
        const createdList = createList(name,rating); 
        $('tbody').append(createdList);
        $("#form").trigger("reset");

        movieObj = {name, rating};
        list.push(movieObj);

    })
//need remove the movie from the list array as well.
    $("tbody").on("click", "#delete-button", function(event){
        $(event.target).parent().parent().remove()
    })
})

$("#sort-name").on('click', function(e){
    //adding underline to indicate that it is sorted by this catagory
    $(e.target).toggleClass("sort")
    //emptying table
    $("tbody").empty();
    //extracting names from the array of obj and sorting them
    let nameList = [];
    for(let movie of list){
    nameList.push(movie.name.toLowerCase())
    sorted = nameList.sort();
    }
    //going thorugh sorted names and finding crooresponding rating
    sorted.forEach(function(val){
    let newList = list.filter(function(obj) {
    return obj.name === val
    })
    $("tbody").append(createList(val, newList[0].rating));
    })
})

$("#sort-rating").on('click', function(e){
   
    //adding underline to indicate that it is sorted by this catagory
    $(e.target).toggleClass("sort")
    //emptying table
    $("tbody").empty();
    //sorting the list
    let sorted = list.sort(
        (p1, p2) => (+p1.rating < +p2.rating) ? 1 : (+p1.rating > +p2.rating) ? -1 : 0);
    console.log(sorted)
    //going thorugh sorted list and appendign them
    sorted.forEach(function(val){
    $("tbody").append(createList(val.name, val.rating));
    })
})
  


function createList(movieName, movieRating) {
    return `<tr>
    <td>${movieName}</td>
    <td>${movieRating}</td>
    <td><button id="delete-button">Delete</button></td>
  </tr>`
}

