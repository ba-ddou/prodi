/*
*
*
*
*/


module.exports = class Product{
    get(){
        return new Promise((resolve,reject)=>{
            setTimeout(_=>resolve('received GET request on "/product"'),2000);
        });
    }

    post(){

    }


    put(){

    }


    delete(){

    }
}