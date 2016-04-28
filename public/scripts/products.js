//Products handler




Products = {
    list: [],
    loaded: false,
    refreshProducts: function(done) {
            console.log("Refresh");
        $.ajax({
            url: 'http://localhost:8080/products',
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.list = data;
                this.loaded=true;
                done(null);
            }.bind(this),
            error: function(xhr, status) {
                done(xhr);
            }
        });
    },
};

function onRefresh(err){
    console.log("Products refresh Error:"+err);
    if(err) setTimeout(function(){
        Products.refreshProducts(onRefresh);
    },3000);    
}
Products.refreshProducts(onRefresh);
