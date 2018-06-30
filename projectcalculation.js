


function paysalary(amt)
{
     var  HRA;
     var Grosspay;
     var Netpay;
    if(amt>50000)
    {
     HRA=((40/100)*(amt));
      Grosspay = amt + HRA;  
     Netpay = Grosspay - 1000;
    }
    else
    {
        HRA=((30/100)*(amt));
         Grosspay = amt + HRA;  
        Netpay = Grosspay - 1000;


    }

    return Netpay;
        
}
module.exports.paysalary=paysalary;

