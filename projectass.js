 var MongoClient=require('mongodb').MongoClient;
var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var proj=require("./projectcalculation.js");

 http.createServer(function(req,res)
{
     console.log(req.method);

    if(req.method=="GET"){
    
       res.writeHead(200,{"content-Type":"text/html"});
         fs.createReadStream("./public/project.html","UTF-8").pipe(res);
    }
    else if(req.method=="POST")
    {
        var body="";
        req.on("data",function(chunk){
            body+=chunk
        });

        req.on("end",function(){

            var obj=qs.parse(body);
            console.log(body);
            var ID=parseInt(obj.eid);
            var Name=(obj.ename);

             var temp= parseFloat(obj.pay);
            var result=proj.paysalary(temp);
            console.log(result);


         res.end(`<!DOCTYPE html>
         <html>
         <head>
             <title>EMPLOYEE DETAILS</title>
         </head>
         <body>
                 <form action="/" method="post">
             <table>
                 <tr>
                 <label>Employee ID</label>
                 <br>
                 <input type="text" id="ename" name="eid" value=${ID} required/>
                 <br>
                 </tr>
         
         
                 
         
                 <tr>
                 <label>Employee Name</label>
                 <br>
                 <input type="text" id="am" name="ename" value=${Name} required/>
                 <br>
                 </tr>
         
         
                 <tr>
                 <label>Basic pay</label>
                 <br>
                 <input type="text" id="en" name="pay" value=${temp} />
                 <br>
                 </tr>
                 
                 <tr>
                 <label>Net pay</label>
                 <br>
                 <input type="text" id="en" name="net" value=${result}  readonly/>
                 <br>
                 </tr>
         
         
         
             
             </table>
             <button>Submit</button>
             </form>
         </body>
         </html> `);

         var myobj={"Empid":ID  ,"Empname":Name ,"Basicpay":temp ,"NetAmount":result};
        MongoClient.connect('mongodb://127.0.0.1:27017/database',function(err,db)
        {
         if(err)
         {
         console.log(err);
         }

         db.collection('EmployeeDetails').insert(myobj,(function(err){
        if(err)
        throw err;

        else{
        console.log("document inserted succesfully");
        }
    }));
     });
    });
}
}).listen(3000);
 console.log(" form server listening on port 3000")