const User=require("../models/user.models"); 
const passport=require("passport");
const bcrypt= require("bcript");
const LocalStrategy=require("passport-local").Strategy;

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user=await User.findOne({ username: username });
            if(user){
                return done(null, false,{message:"Incorrect User"});
            }
            if(!bcript.compare(password,user.password)){
                return done(null, false,{message:"Incorrect Password"});
            }
            return done(null, user);
        } catch (error) {
            return done(err);
        }
    })
);

//Create sessionid
//Login it careares user id inside session
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//Find Session info using session id
passport.deserializeUser(async (id,done)=>{
    try {
        const user=await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,false);
    }
});