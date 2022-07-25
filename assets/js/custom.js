

$("#add_user").submit(function(event){
    alert("Data saved successfully");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, (n, i)=>{
        data[n['name']] = n['value']
    })


    let request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done((response) =>{
        alert("Data Updated Successfully!");
    })
})