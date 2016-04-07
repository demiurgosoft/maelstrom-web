WorldUrl="http://localhost:8080";
User={
    url: "http://localhost:8081",
    getToken:function(){
        return localStorage.token;
    },
    logged:function(){
        if(localStorage.token) return true;
        else return false;
    },
    setToken:function(token){
        localStorage.token=token;
    },
    login:function(data,done){
        var setToken=this.setToken;
        $.ajax({
            url: this.url+"/login",
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                setToken(data.token);
                //TODO: check world login
                done();
            },
            error: function(res) {
                done(res.responseJSON.error);
            }
        });
    },
    signup: function(data,done){
        var setToken=this.setToken;
        var wsign=this.worldSignup;
        $.ajax({
            url: this.url+"/signup",
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                setToken(data.token);
                wsign();
                done();
            },
            error: function(res) {
                done(res.responseJSON.error);
            }
        });
    },
    worldSignup: function(){
        var token=localStorage.token; //this.getToken wont work idk why
        $.ajax({
            url: WorldUrl+"/user/signup",
            type: "POST",
            data: token,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log("User Logged on World Server");
            },
            error: function(res) {
                console.log(res.responseJSON.error);
            }
        });
    },
    logout:function(){
        localStorage.removeItem("token");
        this.token=undefined;
    }
};
