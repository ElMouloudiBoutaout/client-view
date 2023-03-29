const authenticate = (username: string, password: string) : Promise<boolean> => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if(username ==="ok" && password =="ko"){
          resolve(true);
        }
        resolve(false);
        }, 3000);
      });

}


export default authenticate